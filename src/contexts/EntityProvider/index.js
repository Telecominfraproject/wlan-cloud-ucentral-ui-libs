/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as createUuid } from 'uuid';
import { set as lodashSet, get as lodashGet } from 'lodash';
import { useAuth } from '../AuthProvider';

const navbarOption = ({
  name,
  uuid,
  selectEntity,
  path,
  isVenue,
  children,
  childrenEntities,
  childrenVenues,
  extraData = {},
}) => {
  let tag = 'SidebarChildless';
  if (children) tag = 'SidebarDropdown';

  return {
    key: uuid,
    uuid,
    _tag: tag,
    name,
    path,
    isVenue,
    onClick: () =>
      selectEntity(uuid, name, path, isVenue, childrenEntities, childrenVenues, extraData),
    _children: children,
  };
};

const EntityContext = React.createContext();

export const EntityProvider = ({ axiosInstance, selectedEntity, children }) => {
  const history = useHistory();
  const { currentToken, endpoints } = useAuth();
  const [entity, setEntity] = useState(selectedEntity);
  const [entities, setEntities] = useState([]);
  const [entityToRetrieve, setEntityToRetrieve] = useState(null);
  const [rootEntityMissing, setRootEntityMissing] = useState([]);
  const [parentsWithChildrenLoaded, setParentsWithChildrenLoaded] = useState([]);
  const [deviceTypes, setDeviceTypes] = useState([]);

  const selectEntity = (uuid, name, path, isVenue, childrenEntities, childrenVenues, extraData) => {
    // If we have not yet gotten the information of this entity's children, we get them now
    if (childrenEntities || childrenVenues) {
      setEntityToRetrieve({ childrenEntities, childrenVenues, path, uuid, isVenue });
    }
    setEntity({
      uuid,
      name,
      isVenue,
      childrenEntities,
      childrenVenues,
      path,
      extraData,
    });
    history.push(`/${isVenue ? 'venue' : 'entity'}/${uuid}`);
  };

  const getEntity = async (id, isVenue = false) => {
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    return axiosInstance
      .get(`${endpoints.owprov}/api/v1/${isVenue ? 'venue' : 'entity'}/${id}`, options)
      .then((response) => response.data)
      .catch(() => {
        history.push(`/entity/0000-0000-0000`);
      });
  };

  const getEntities = async (ids, isVenue = false) => {
    if (!ids || ids.length === 0) return [];

    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    return axiosInstance
      .get(
        `${endpoints.owprov}/api/v1/${isVenue ? 'venue' : 'entity'}?select=${ids.join(',')}`,
        options,
      )
      .then((response) => (isVenue ? response.data.venues : response.data.entities))
      .catch(() => {
        throw new Error('Error while fetching entities');
      });
  };

  const setProviderEntity = async (id, isVenue) => {
    const newEntity = await getEntity(id, isVenue);
    if (newEntity) {
      const newObj = {
        ...newEntity,
        uuid: newEntity.id,
        name: newEntity.name,
        path: null,
        isVenue,
        childrenIds: newEntity.children,
        childrenVenues: newEntity.venues,
        extraData: newEntity,
        refreshId: createUuid(),
      };

      setEntity({ ...newObj });
    }
  };

  const getEntityChildren = async (parent) => {
    const loadedParents = parentsWithChildrenLoaded;
    const basePath = `${parent.path}._children.`;
    const parentInfo = lodashGet(entities, parent.path);
    setParentsWithChildrenLoaded([]);

    try {
      const entitiesResult = await getEntities(parent.childrenEntities, false);
      const venuesResult = await getEntities(parent.childrenVenues, true);

      // Mapping the new child entities
      let startingVenuesIndex = 0;
      const newEntityOptions = entitiesResult.map((result, resultIndex) => {
        startingVenuesIndex += 1;
        if (result.children.length === 0 && result.venues.length === 0) {
          return navbarOption({
            name: result.name,
            uuid: result.id,
            selectEntity,
            path: `${basePath}[${resultIndex}]`,
            isVenue: false,
          });
        }
        const grandChildrenEntities = result.children;
        const grandChildrenVenues = result.venues;
        let nestedOptions = result.children.map((nested, index) =>
          navbarOption({
            name: '',
            uuid: nested,
            selectEntity,
            path: `${basePath}${resultIndex}.[${index}]`,
            isVenue: false,
          }),
        );

        // If there is a child of this function's 'parent' parameter for which we already loaded children, we keep the old values
        if (parentsWithChildrenLoaded.includes(result.id)) {
          const oldInformation = parentInfo._children.find((e) => e.uuid === result.id);
          if (oldInformation) {
            nestedOptions = oldInformation._children;
          }
        }

        return navbarOption({
          name: result.name,
          uuid: result.id,
          selectEntity,
          path: `${basePath}[${resultIndex}]`,
          isVenue: false,
          children: nestedOptions,
          childrenEntities: grandChildrenEntities,
          childrenVenues: grandChildrenVenues,
          extraData: result,
        });
      });

      // Mapping the new child venues
      const newVenueOptions = venuesResult.map((result, resultIndex) => {
        if (result.children.length === 0) {
          return navbarOption({
            name: result.name,
            uuid: result.id,
            selectEntity,
            path: `${basePath}[${startingVenuesIndex + resultIndex}]`,
            isVenue: true,
          });
        }
        const grandChildrenVenues = result.children;
        let nestedOptions = result.children.map((nested, index) =>
          navbarOption({
            name: '',
            uuid: nested,
            selectEntity,
            path: `${basePath}${startingVenuesIndex + resultIndex}.[${index}]`,
            isVenue: true,
          }),
        );

        // If there is a child of this function's 'parent' parameter for which we already loaded children, we keep the old values
        if (parentsWithChildrenLoaded.includes(result.id)) {
          const oldInformation = parentInfo._children.find((e) => e.uuid === result.id);
          if (oldInformation) {
            nestedOptions = oldInformation._children;
          }
        }

        return navbarOption({
          name: result.name,
          uuid: result.id,
          selectEntity,
          path: `${basePath}[${startingVenuesIndex + resultIndex}]`,
          isVenue: true,
          children: nestedOptions,
          childrenVenues: grandChildrenVenues,
        });
      });

      const newEntities = entities;
      const newOptions = [...newEntityOptions, ...newVenueOptions];
      lodashSet(newEntities, `${parent.path}._children`, newOptions);
      setEntities([...newEntities]);
      setParentsWithChildrenLoaded([...loadedParents, parent.uuid]);
    } catch {
      throw new Error('Error while fetching children');
    }
  };

  const createRoot = () => {
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    const parameters = {
      name: 'World',
      description: 'Root',
    };

    axiosInstance
      .post(`${endpoints.owprov}/api/v1/entity/0000-0000-0000`, parameters, options)
      .then(() => {
        getRootEntity();
      })
      .catch(() => {
        setRootEntityMissing(true);
      });
  };

  const getRootEntity = () => {
    setRootEntityMissing(false);
    setEntities([]);
    setParentsWithChildrenLoaded([]);
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    axiosInstance
      .get(`${endpoints.owprov}/api/v1/entity/0000-0000-0000`, options)
      .then((response) => {
        const rootChildren = response.data.children.map((nested, index) =>
          navbarOption({
            name: '',
            uuid: nested,
            selectEntity,
            path: `[0]._children.[${index}]`,
            isVenue: false,
          }),
        );

        setEntities([
          navbarOption({
            name: response.data.name,
            uuid: '0000-0000-0000',
            selectEntity,
            path: '[0]',
            isVenue: false,
            children: rootChildren,
            childrenEntities: response.data.children,
          }),
        ]);
      })
      .catch((e) => {
        // If the root does not exist, trigger the root creation process
        if (
          e.response &&
          e.response.data.ErrorCode !== undefined &&
          e.response.data.ErrorCode === 404
        ) {
          createRoot();
        } else {
          throw new Error('Error while fetching root');
        }
      });
  };

  const refreshEntityChildren = async ({ uuid, path, isVenue }) => {
    const oldInfo = lodashGet(entities, `${path}`);
    const refreshedInfo = await getEntity(uuid, isVenue);

    // If the button was previously childless, we need to make it be a dropdown
    setParentsWithChildrenLoaded([]);
    if (!oldInfo) {
      getRootEntity();
    } else {
      // eslint-disable-next-line no-underscore-dangle
      if (
        oldInfo._tag === 'SidebarChildless' &&
        (refreshedInfo.children.length > 0 || refreshedInfo.venues?.length > 0)
      ) {
        setEntities([...lodashSet(entities, `${path}`, { ...oldInfo, _tag: 'SidebarDropdown' })]);
      }

      if (isVenue)
        getEntityChildren({
          childrenEntities: [],
          childrenVenues: refreshedInfo.children,
          path,
          uuid,
        });
      else
        getEntityChildren({
          childrenEntities: refreshedInfo.children,
          childrenVenues: refreshedInfo.venues,
          path,
          uuid,
        });
    }
  };

  const refreshEntity = async (path, newData) => {
    const oldInfo = lodashGet(entities, `${path}`);
    const newInfo = { ...oldInfo, ...newData };
    newInfo.onClick = () =>
      selectEntity(
        newInfo.uuid,
        newInfo.name,
        newInfo.path,
        newInfo.isVenue,
        newInfo.childrenEntities,
        newInfo.childrenVenues,
      );
    setEntities(lodashSet(entities, `${path}`, newInfo));
  };

  const deleteEntity = async ({ path }) => {
    const splitPath = path.split('.');
    const parentPath = splitPath.slice(0, splitPath.length - 2).join('.');
    const oldInfo = lodashGet(entities, `${parentPath}`);
    if (!oldInfo || parentPath === '') {
      getRootEntity();
    } else {
      const parentInfoFromApi = await getEntity(oldInfo.uuid, oldInfo.isVenue);
      selectEntity(oldInfo.uuid, oldInfo.name, parentPath, oldInfo.isVenue);

      if (
        parentInfoFromApi.children.length === 0 &&
        (parentInfoFromApi.venues === undefined || parentInfoFromApi.venues?.length === 0)
      ) {
        setEntities(lodashSet(entities, `${parentPath}`, { ...oldInfo, _tag: 'SidebarChildless' }));
      } else if (oldInfo.isVenue) {
        getEntityChildren({
          childrenEntities: [],
          childrenVenues: parentInfoFromApi.children,
          uuid: oldInfo.uuid,
          path: parentPath,
          isVenue: oldInfo.isVenue,
        });
      } else {
        getEntityChildren({
          childrenEntities: parentInfoFromApi.children,
          childrenVenues: parentInfoFromApi.venues,
          uuid: oldInfo.uuid,
          path: parentPath,
          isVenue: oldInfo.isVenue,
        });
      }
    }
  };

  const getDeviceTypes = () => {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${currentToken}`,
    };

    axiosInstance
      .get(`${endpoints.owfms}/api/v1/firmwares?deviceSet=true`, {
        headers,
      })
      .then((response) => {
        const newDeviceTypes = response.data.deviceTypes;
        setDeviceTypes(newDeviceTypes);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (currentToken !== '' && endpoints?.owprov) getRootEntity();
    if (currentToken !== '' && endpoints?.owfms) getDeviceTypes();
  }, [endpoints, currentToken]);

  useEffect(() => {
    if (entityToRetrieve && !parentsWithChildrenLoaded.includes(entityToRetrieve.uuid)) {
      getEntityChildren(entityToRetrieve);
    }
  }, [entityToRetrieve]);

  return (
    <EntityContext.Provider
      value={{
        entity,
        setEntity,
        entities,
        rootEntityMissing,
        setProviderEntity,
        getRootEntity,
        refreshEntity,
        refreshEntityChildren,
        deleteEntity,
        deviceTypes,
      }}
    >
      {children}
    </EntityContext.Provider>
  );
};

EntityProvider.propTypes = {
  axiosInstance: PropTypes.instanceOf(Object).isRequired,
  selectedEntity: PropTypes.instanceOf(Object),
  children: PropTypes.node.isRequired,
};

EntityProvider.defaultProps = {
  selectedEntity: null,
};

export const useEntity = () => React.useContext(EntityContext);
