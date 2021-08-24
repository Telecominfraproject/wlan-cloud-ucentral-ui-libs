/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { set as lodashSet, get as lodashGet } from 'lodash';
import { useAuth } from '../AuthProvider';

const navbarOption = (name, uuid, selectEntity, children, childrenIds, path) => {
  let tag = 'SidebarChildless';
  if (children) tag = 'SidebarDropdown';

  return {
    key: uuid,
    uuid,
    _tag: tag,
    name,
    path,
    onClick: () => selectEntity(uuid, name, childrenIds, path),
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

  const selectEntity = (uuid, name, childrenIds, path) => {
    // If we have not yet gotten the information of this entity's children, we get them now
    if (childrenIds && !parentsWithChildrenLoaded.includes(uuid)) {
      setEntityToRetrieve({ childrenIds, path, uuid });
    }
    history.push(`/entity/${uuid}`);
    setEntity({
      uuid,
      name,
      childrenIds,
      path,
    });
  };

  const getEntity = async (id) => {
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    return axiosInstance
      .get(`${endpoints.owprov}/api/v1/entity/${id}`, options)
      .then((response) => response.data)
      .catch(() => {
        throw new Error('Error while fetching entities');
      });
  };

  const setProviderEntity = async (id) => {
    const newEntity = await getEntity(id);
    setEntity({
      uuid: newEntity.id,
      name: newEntity.name,
      childrenIds: newEntity.children,
      path: null,
    });
  };

  const getEntityChildren = async (parent) => {
    const loadedParents = parentsWithChildrenLoaded;
    const basePath = `${parent.path}._children.`;
    const parentInfo = lodashGet(entities, parent.path);
    setParentsWithChildrenLoaded([]);

    // Getting the information of each child
    const promises = [];
    for (const id of parent.childrenIds) {
      promises.push(getEntity(id));
    }

    try {
      const results = await Promise.all(promises);
      const newOptions = results.map((result, resultIndex) => {
        if (result.children.length === 0) {
          return navbarOption(
            result.name,
            result.id,
            selectEntity,
            undefined,
            undefined,
            `${basePath}[${resultIndex}]`,
          );
        }
        const grandChildrenIds = result.children;
        let nestedOptions = result.children.map((nested, index) =>
          navbarOption(
            '',
            nested,
            selectEntity,
            undefined,
            undefined,
            `${basePath}${resultIndex}.[${index}]`,
          ),
        );

        // If there is a child of this function's 'parent' parameter for which we already loaded children, we keep the old values
        if (parentsWithChildrenLoaded.includes(result.id)) {
          const oldInformation = parentInfo._children.find((e) => e.uuid === result.id);
          if (oldInformation) {
            nestedOptions = oldInformation._children;
          }
        }

        return navbarOption(
          result.name,
          result.id,
          selectEntity,
          nestedOptions,
          grandChildrenIds,
          `${basePath}[${resultIndex}]`,
        );
      });
      const newEntities = entities;
      lodashSet(newEntities, `${parent.path}._children`, newOptions);

      setEntities([...newEntities]);
      setParentsWithChildrenLoaded([...loadedParents, parent.uuid]);
    } catch (e) {
      throw new Error('Error while fetching children');
    }
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
          navbarOption('', nested, selectEntity, undefined, undefined, `[0]._children.[${index}]`),
        );

        setEntities([
          navbarOption(
            response.data.name,
            '0000-0000-0000',
            selectEntity,
            rootChildren,
            response.data.children,
            '[0]',
          ),
        ]);
      })
      .catch((e) => {
        // If the root does not exist, trigger the root creation process
        if (
          e.response &&
          e.response.data.ErrorCode !== undefined &&
          e.response.data.ErrorCode === 404
        ) {
          setRootEntityMissing(true);
        } else {
          throw new Error('Error while fetching root');
        }
      });
  };

  const refreshEntityChildren = async ({ uuid, path }) => {
    const oldInfo = lodashGet(entities, `${path}`);
    const refreshedInfo = await getEntity(uuid);

    // If the button was previously childless, we need to make it be a dropdown
    setParentsWithChildrenLoaded([]);
    if (!oldInfo) {
      getRootEntity();
    } else {
      // eslint-disable-next-line no-underscore-dangle
      if (oldInfo._tag === 'SidebarChildless' && refreshedInfo.children.length > 0) {
        setEntities([...lodashSet(entities, `${path}`, { ...oldInfo, _tag: 'SidebarDropdown' })]);
      }
      getEntityChildren({ childrenIds: refreshedInfo.children, path, uuid });
    }
  };

  const refreshEntity = async (path, newData) => {
    const oldInfo = lodashGet(entities, `${path}`);
    setEntities(lodashSet(entities, `${path}`, { ...oldInfo, ...newData }));
  };

  const deleteEntity = async ({ path }) => {
    const splitPath = path.split('.');
    const parentPath = splitPath.slice(0, splitPath.length - 2).join('.');
    const oldInfo = lodashGet(entities, `${parentPath}`);
    if (!oldInfo || parentPath === '') {
      getRootEntity();
    } else {
      const parentInfoFromApi = await getEntity(oldInfo.uuid);
      selectEntity(oldInfo.uuid, oldInfo.name, parentInfoFromApi.children, parentPath);
      if (parentInfoFromApi.children.length === 0) {
        setEntities(lodashSet(entities, `${parentPath}`, { ...oldInfo, _tag: 'SidebarChildless' }));
      } else {
        getEntityChildren({
          childrenIds: parentInfoFromApi.children,
          uuid: oldInfo.uuid,
          path: parentPath,
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
      .get(`${endpoints.ucentralfms}/api/v1/firmwares?deviceSet=true`, {
        headers,
      })
      .then((response) => {
        const newDeviceTypes = response.data.deviceTypes;
        setDeviceTypes(newDeviceTypes);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (endpoints?.owprov) getRootEntity();
    if (endpoints?.ucentralfms) getDeviceTypes();
  }, [endpoints]);

  useEffect(() => {
    if (entityToRetrieve && !parentsWithChildrenLoaded.includes(entityToRetrieve.uuid))
      getEntityChildren(entityToRetrieve);
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
