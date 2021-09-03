import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {
  CButton,
  CCardBody,
  CDataTable,
  CCard,
  CCardHeader,
  CRow,
  CCol,
  CSelect,
  CLink,
  CPopover,
  CSwitch,
  CButtonToolbar,
} from '@coreui/react';
import { cilPencil, cilPlus, cilSync } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import ReactTooltip from 'react-tooltip';
import DeleteButton from './DeleteButton';
import UnassignButton from './UnassignButton';

const InventoryTable = ({
  t,
  loading,
  tags,
  tagsPerPage,
  updateTagsPerPage,
  page,
  updatePage,
  pageCount,
  onlyEntity,
  toggleAdd,
  unassign,
  title,
  assignToEntity,
  entity,
  toggleEditModal,
  deleteTag,
  onlyUnassigned,
  toggleUnassignedDisplay,
  refresh,
}) => {
  const columns =
    onlyEntity || onlyUnassigned
      ? [
          { key: 'serialNumber', label: t('common.serial_number'), _style: { width: '6%' } },
          { key: 'name', label: t('user.name'), _style: { width: '20%' } },
          { key: 'description', label: t('user.description'), _style: { width: '24%' } },
          { key: 'actions', label: t('actions.actions'), _style: { width: '1%' } },
        ]
      : [
          { key: 'serialNumber', label: t('common.serial_number'), _style: { width: '6%' } },
          { key: 'name', label: t('user.name'), _style: { width: '10%' } },
          { key: 'entity', label: t('entity.entity'), _style: { width: '24%' } },
          { key: 'venue', label: t('inventory.venue'), _style: { width: '24%' } },
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
      <CCard>
        <CCardHeader className="p-1">
          <CRow>
            <CCol sm="6">
              <div className="text-value-lg">{title}</div>
            </CCol>
            <CCol sm="2" className="pt-2 text-right">
              <div hidden={onlyEntity || entity !== null}>{t('entity.only_unassigned')}</div>
            </CCol>
            <CCol sm="1" className="pt-1 text-center">
              <div hidden={onlyEntity || entity !== null}>
                <CSwitch
                  id="showUnassigned"
                  color="primary"
                  defaultChecked={onlyUnassigned}
                  onClick={toggleUnassignedDisplay}
                  size="lg"
                />
              </div>
            </CCol>
            <CCol sm="3">
              <CRow>
                <CCol>
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
                </CCol>
                <CCol>
                  <CButtonToolbar role="group" className="justify-content-end">
                    <CPopover content={t('inventory.add_tag')}>
                      <CButton
                        color="primary"
                        variant="outline"
                        onClick={toggleAdd}
                        className="mx-1"
                      >
                        <CIcon content={cilPlus} />
                      </CButton>
                    </CPopover>
                    <CPopover content={t('common.refresh')}>
                      <CButton color="primary" variant="outline" onClick={refresh} className="ml-1">
                        <CIcon content={cilSync} />
                      </CButton>
                    </CPopover>
                  </CButtonToolbar>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody className="p-0">
          <CDataTable
            addTableClasses="ignore-overflow"
            items={tags ?? []}
            fields={columns}
            hover
            border
            loading={loading}
            scopedSlots={{
              serialNumber: (item) => <td className="align-middle">{item.serialNumber}</td>,
              name: (item) => <td className="align-middle">{item.name}</td>,
              description: (item) => <td className="align-middle">{item.description}</td>,
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
                      {item.entity_info ? item.entity_info.name : item.entity}
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
                      {item.venue_info ? item.venue_info.name : item.venue}
                    </CLink>
                  )}
                </td>
              ),
              actions: (item) => (
                <td className="text-center align-middle py-0">
                  <CButtonToolbar
                    role="group"
                    className="justify-content-flex-end"
                    style={{ width: '200px' }}
                  >
                    <CPopover content={t('inventory.assign_to_entity')}>
                      <div>
                        <CButton
                          disabled={onlyEntity || item.entity !== '' || item.venue !== ''}
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          className="mx-2"
                          onClick={() => assignToEntity(item.serialNumber)}
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
                    <DeleteButton
                      t={t}
                      tag={item}
                      deleteTag={deleteTag}
                      hideTooltips={hideTooltips}
                    />
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
        </CCardBody>
      </CCard>
    </>
  );
};

InventoryTable.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  tags: PropTypes.instanceOf(Array).isRequired,
  tagsPerPage: PropTypes.string.isRequired,
  updateTagsPerPage: PropTypes.func.isRequired,
  page: PropTypes.string,
  updatePage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  toggleAdd: PropTypes.func,
  onlyEntity: PropTypes.bool,
  assignToEntity: PropTypes.func.isRequired,
  unassign: PropTypes.func.isRequired,
  title: PropTypes.string,
  entity: PropTypes.instanceOf(Object),
  toggleEditModal: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  onlyUnassigned: PropTypes.bool.isRequired,
  toggleUnassignedDisplay: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

InventoryTable.defaultProps = {
  page: '0',
  toggleAdd: null,
  onlyEntity: false,
  title: null,
  entity: null,
};

export default InventoryTable;
