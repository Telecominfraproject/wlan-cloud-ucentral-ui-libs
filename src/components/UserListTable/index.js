import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {
  CCard,
  CCardHeader,
  CSelect,
  CCol,
  CRow,
  CCardBody,
  CDataTable,
  CPopover,
  CButton,
} from '@coreui/react';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { capitalizeFirstLetter, prettyDate } from '../../utils/formatting';
import DeleteModal from '../DeleteModal';

const UserListTable = ({
  t,
  users,
  loading,
  usersPerPage,
  setUsersPerPage,
  pageCount,
  setPage,
  deleteUser,
  deleteLoading,
}) => {
  const [idToDelete, setIdToDelete] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setShowDeleteModal(true);
  };

  const fields = [
    { key: 'Id', label: t('user.id'), _style: { width: '50%' } },
    { key: 'name', label: t('user.nickname'), _style: { width: '15%' } },
    { key: 'email', label: t('user.email_address'), _style: { width: '10%' } },
    { key: 'userRole', label: t('user.user_role'), _style: { width: '5%' } },
    { key: 'lastLogin', label: t('user.last_login'), _style: { width: '10%' } },
    {
      key: 'user_actions',
      label: '',
      _style: { width: '5%' },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <div>
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
          <CDataTable
            items={users}
            fields={fields}
            loading={loading}
            hover
            border
            scopedSlots={{
              lastLogin: (item) => <td>{item.lastLogin ? prettyDate(item.lastLogin) : ''}</td>,
              userRole: (item) => (
                <td>{item.userRole ? capitalizeFirstLetter(item.userRole) : ''}</td>
              ),
              user_actions: (item) => (
                <td className="py-2">
                  <CPopover content={t('common.delete')}>
                    <CButton
                      onClick={() => handleDeleteClick(item.Id)}
                      color="primary"
                      variant="outline"
                      size="sm"
                    >
                      <CIcon content={cilTrash} size="sm" />
                    </CButton>
                  </CPopover>
                </td>
              ),
            }}
          />
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
      <DeleteModal
        t={t}
        show={showDeleteModal}
        toggleShow={toggleDeleteModal}
        deleteRequest={deleteUser}
        idToDelete={idToDelete}
        deleteLoading={deleteLoading}
        title={t('user.delete_title')}
        explanation=""
        warning={t('user.delete_warning')}
      />
    </div>
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
  deleteUser: PropTypes.func.isRequired,
  deleteLoading: PropTypes.bool.isRequired,
};

export default React.memo(UserListTable);
