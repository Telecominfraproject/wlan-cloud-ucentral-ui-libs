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
import { cilBan, cilCheckCircle, cilTrash } from '@coreui/icons';
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

  const getValidatedIcon = (validated) => {
    const color = validated ? 'success' : 'secondary';
    return <CIcon content={validated ? cilCheckCircle : cilBan} color={color} size="lg" />;
  };

  const fields = [
    { key: 'email', label: t('user.login_id'), _style: { width: '20%' } },
    { key: 'name', label: t('user.name'), _style: { width: '20%' } },
    { key: 'userRole', label: t('user.user_role'), _style: { width: '5%' } },
    { key: 'description', label: t('user.description'), _style: { width: '26%' } },
    { key: 'validated', label: t('user.validated'), _style: { width: '5%' } },
    { key: 'lastLogin', label: t('user.last_login'), _style: { width: '20%' } },
    {
      key: 'user_actions',
      label: '',
      _style: { width: '4%' },
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
              validated: (item) => (
                <td className="centeredColumn">
                  <CPopover
                    content={item.validated ? t('user.validated') : t('user.not_validated')}
                  >
                    {getValidatedIcon(item.validated)}
                  </CPopover>
                </td>
              ),
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
