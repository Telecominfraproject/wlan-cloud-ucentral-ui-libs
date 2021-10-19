import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { CButton, CDataTable, CLink, CPopover, CButtonToolbar, CSelect } from '@coreui/react';
import { cilPencil, cilPlus, cilRouter, cilSpreadsheet } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import ReactTooltip from 'react-tooltip';
import DeleteButton from './DeleteButton';
import UnassignButton from './UnassignButton';
import FormattedDate from '../FormattedDate';

const InventoryTable = ({
  t,
  loading,
  tags,
  tagsPerPage,
  updateTagsPerPage,
  page,
  updatePage,
  pageCount,
  entity,
  onlyEntity,
  unassign,
  assignToEntity,
  toggleEditModal,
  deleteTag,
  onlyUnassigned,
  toggleAssociate,
  toggleAssocEntity,
  toggleComputed,
  pushConfig,
}) => {
  const [gwUi] = useState(localStorage.getItem('owgw-ui'));
  const columns =
    onlyEntity || onlyUnassigned
      ? [
          { key: 'serialNumber', label: t('common.serial_number'), _style: { width: '6%' } },
          { key: 'name', label: t('user.name'), _style: { width: '10%' } },
          { key: 'deviceConfiguration', label: t('configuration.title'), _style: { width: '10%' } },
          { key: 'description', label: t('user.description'), _style: { width: '24%' } },
          { key: 'created', label: t('common.created'), _style: { width: '10%' } },
          { key: 'actions', label: t('actions.actions'), _style: { width: '1%' } },
        ]
      : [
          { key: 'serialNumber', label: t('common.serial_number'), _style: { width: '10%' } },
          { key: 'name', label: t('user.name'), _style: { width: '15%' } },
          { key: 'deviceConfiguration', label: t('configuration.title'), _style: { width: '10%' } },
          { key: 'entity', label: t('entity.entity'), _style: { width: '24%' } },
          { key: 'venue', label: t('inventory.venue'), _style: { width: '24%' } },
          { key: 'created', label: t('common.created'), _style: { width: '10%' } },
          { key: 'actions', label: t('actions.actions'), _style: { width: '1%' } },
        ];

  const hideTooltips = () => ReactTooltip.hide();

  const escFunction = (event) => {
    if (event.keyCode === 27) {
      hideTooltips();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return (
    <>
      <CDataTable
        addTableClasses="ignore-overflow"
        items={tags ?? []}
        fields={columns}
        hover
        border
        loading={loading}
        scopedSlots={{
          serialNumber: (item) => (
            <td className="align-middle">
              <CLink
                className="c-subheader-nav-link align-self-center"
                aria-current="page"
                href={`${gwUi}/#/devices/${item.serialNumber}`}
                target="_blank"
                disabled={!gwUi || gwUi === ''}
              >
                {item.serialNumber}
              </CLink>
            </td>
          ),
          name: (item) => <td className="align-middle">{item.name}</td>,
          created: (item) => (
            <td className="align-middle">
              <FormattedDate date={item.created} />
            </td>
          ),
          description: (item) => <td className="align-middle">{item.description}</td>,
          deviceConfiguration: (item) => (
            <td className="align-middle">
              <CButton
                id={item.serialNumber}
                className="pl-0 text-left"
                color="link"
                onClick={() =>
                  toggleAssociate({
                    serialNumber: item.serialNumber,
                    uuid: item.deviceConfiguration,
                    value: item.deviceConfigurationName,
                  })
                }
              >
                {item.deviceConfiguration === ''
                  ? t('configuration.add_or_link')
                  : item.extendedInfo?.deviceConfiguration?.name ?? item.deviceConfiguration}
              </CButton>
            </td>
          ),
          entity: (item) => (
            <td className="align-middle">
              {onlyEntity ? (
                item.entity
              ) : (
                <CLink
                  className="c-subheader-nav-link"
                  aria-current="page"
                  to={() => `/entity/${item.entity}`}
                >
                  {item.extendedInfo?.entity?.name ?? item.entity}
                </CLink>
              )}
            </td>
          ),
          venue: (item) => (
            <td className="align-middle">
              {onlyEntity ? (
                item.venue
              ) : (
                <CLink
                  className="c-subheader-nav-link"
                  aria-current="page"
                  to={() => `/venue/${item.venue}`}
                >
                  {item.extendedInfo?.venue?.name ?? item.venue}
                </CLink>
              )}
            </td>
          ),
          actions: (item) => (
            <td className="text-center align-middle py-0">
              <CButtonToolbar
                role="group"
                className="justify-content-flex-end"
                style={{ width: '300px' }}
              >
                <CPopover content={t('inventory.assign_ent_ven')}>
                  <div>
                    <CButton
                      disabled={onlyEntity || item.entity !== '' || item.venue !== ''}
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      className="mx-2"
                      onClick={() =>
                        entity !== null
                          ? assignToEntity(item.serialNumber)
                          : toggleAssocEntity({ serialNumber: item.serialNumber })
                      }
                      style={{ width: '33px', height: '30px' }}
                    >
                      <CIcon content={cilPlus} />
                    </CButton>
                  </div>
                </CPopover>
                <UnassignButton
                  t={t}
                  tag={item}
                  unassignTag={unassign}
                  hideTooltips={hideTooltips}
                />
                <DeleteButton t={t} tag={item} deleteTag={deleteTag} hideTooltips={hideTooltips} />
                <CPopover content="Push Configuration to Device">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    className="mx-2"
                    onClick={() => pushConfig(item.serialNumber)}
                    style={{ width: '33px', height: '30px' }}
                    disabled={item.deviceConfigurationName === ''}
                  >
                    <CIcon name="cil-router" content={cilRouter} size="sm" />
                  </CButton>
                </CPopover>
                <CPopover content="See Computed Configuration">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    className="mx-2"
                    onClick={() => toggleComputed(item.serialNumber)}
                    style={{ width: '33px', height: '30px' }}
                  >
                    <CIcon name="cil-spreadsheet" content={cilSpreadsheet} size="sm" />
                  </CButton>
                </CPopover>
                <CPopover content="Edit Tag">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    className="mx-2"
                    onClick={() => toggleEditModal(item.serialNumber)}
                    style={{ width: '33px', height: '30px' }}
                  >
                    <CIcon name="cil-pencil" content={cilPencil} size="sm" />
                  </CButton>
                </CPopover>
              </CButtonToolbar>
            </td>
          ),
        }}
      />
      <div className="pl-3">
        <div className="float-left pr-3">
          <ReactPaginate
            previousLabel="← Previous"
            nextLabel="Next →"
            pageCount={pageCount}
            onPageChange={updatePage}
            forcePage={Number(page)}
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
        <p className="float-left pr-2 pt-1">{t('common.items_per_page')}</p>
        <div style={{ width: '100px' }} className="float-left px-2">
          <CSelect
            custom
            defaultValue={tagsPerPage}
            onChange={(e) => updateTagsPerPage(e.target.value)}
            disabled={loading}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </CSelect>
        </div>
      </div>
    </>
  );
};

InventoryTable.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  tags: PropTypes.instanceOf(Array).isRequired,
  tagsPerPage: PropTypes.string.isRequired,
  entity: PropTypes.instanceOf(Object),
  updateTagsPerPage: PropTypes.func.isRequired,
  page: PropTypes.string,
  updatePage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  onlyEntity: PropTypes.bool,
  assignToEntity: PropTypes.func.isRequired,
  unassign: PropTypes.func.isRequired,
  toggleEditModal: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  onlyUnassigned: PropTypes.bool.isRequired,
  toggleAssociate: PropTypes.func.isRequired,
  toggleAssocEntity: PropTypes.func.isRequired,
  toggleComputed: PropTypes.func.isRequired,
  pushConfig: PropTypes.func.isRequired,
};

InventoryTable.defaultProps = {
  page: '0',
  onlyEntity: false,
  entity: null,
};

export default InventoryTable;
