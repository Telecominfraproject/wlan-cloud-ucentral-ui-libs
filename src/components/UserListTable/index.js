import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { CCard, CCardHeader, CSelect, CCol, CRow, CCardBody, CDataTable } from '@coreui/react';

const UserListTable = ({
  t,
  users,
  loading,
  usersPerPage,
  setUsersPerPage,
  pageCount,
  setPage,
}) => {
  const fields = [
    { key: 'id', label: t('common.config_id'), _style: { width: '5%' } },
    { key: 'name', label: t('common.config_id'), _style: { width: '5%' } },
    { key: 'email', label: t('common.config_id'), _style: { width: '5%' } },
    { key: 'userRole', label: t('common.config_id'), _style: { width: '5%' } },
    { key: 'id', label: t('common.config_id'), _style: { width: '5%' } },
    {
      key: 'user_actions',
      label: '',
      _style: { width: '3%' },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol />
          <CCol xs={1}>
            <CSelect
              custom
              defaultValue={usersPerPage}
              onChange={(e) => setUsersPerPage(e.target.value)}
              disabled={loading}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </CSelect>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable items={users} fields={fields} loading={loading} hover border />
        <ReactPaginate
          previousLabel="← Previous"
          nextLabel="Next →"
          pageCount={pageCount}
          onPageChange={setPage}
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
      </CCardBody>
    </CCard>
  );
};

UserListTable.propTypes = {
  t: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  usersPerPage: PropTypes.string.isRequired,
  setUsersPerPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default React.memo(UserListTable);
