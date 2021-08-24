import React from 'react';
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
} from '@coreui/react';

const InventoryTable = ({
  t,
  loading,
  tags,
  tagsPerPage,
  updateTagsPerPage,
  page,
  updatePage,
  pageCount,
  entityPage,
  toggleAdd,
  tagType,
  setTagType,
}) => {
  const columns = !entityPage
    ? [
        { key: 'serialNumber', label: t('common.serial_number'), _style: { width: '6%' } },
        { key: 'name', label: t('user.name'), _style: { width: '6%' } },
        { key: 'entity', label: t('entity.entity'), _style: { width: '24%' } },
        { key: 'venue', label: t('inventory.venue'), _style: { width: '24%' } },
        { key: 'subscriber', label: t('inventory.subscriber'), _style: { width: '24%' } },
        { key: 'actions', label: t('actions.actions'), _style: { width: '8%' } },
      ]
    : [
        { key: 'serialNumber', label: t('common.serial_number'), _style: { width: '6%' } },
        { key: 'name', label: t('user.name'), _style: { width: '6%' } },
        { key: 'venue', label: t('inventory.venue'), _style: { width: '24%' } },
        { key: 'subscriber', label: t('inventory.subscriber'), _style: { width: '24%' } },
        { key: 'actions', label: t('actions.actions'), _style: { width: '8%' } },
      ];

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol />
            <CCol xs={1} hidden={entityPage}>
              <CSelect
                custom
                defaultValue={tagType}
                onChange={(e) => setTagType(e.target.value)}
                disabled={loading}
              >
                <option value="&unassigned=true">{t('entity.only_unassigned')}</option>
                <option value="">{t('common.show_all')}</option>
              </CSelect>
            </CCol>
            <CCol xs={1}>
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
            <CCol xs={2} hidden={toggleAdd === null}>
              <div className="text-right">
                <CButton color="primary" variant="outline" shape="square" onClick={toggleAdd} block>
                  {t('inventory.add_tag')}
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            addTableClasses="ignore-overflow"
            items={tags ?? []}
            fields={columns}
            hover
            border
            loading={loading}
            scopedSlots={{
              serialNumber: (item) => (
                <td className="text-center align-middle">{item.serialNumber}</td>
              ),
              name: (item) => <td className="text-center align-middle">{item.name}</td>,
              entity: (item) => (
                <td className="text-center align-middle">
                  {entityPage ? (
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
              venue: (item) => <td className="text-center align-middle">{item.venue}</td>,
              subscriber: (item) => <td className="text-center align-middle">{item.subscriber}</td>,
              actions: (item) => <td className="text-center align-middle">{item.actions}</td>,
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
  entityPage: PropTypes.bool,
  tagType: PropTypes.string.isRequired,
  setTagType: PropTypes.func.isRequired,
};

InventoryTable.defaultProps = {
  page: '0',
  toggleAdd: null,
  entityPage: false,
};

export default InventoryTable;
