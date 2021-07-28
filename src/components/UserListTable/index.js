import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CPopover,
  CRow,
  CSelect,
} from '@coreui/react';
import { cilBan, cilCheckCircle, cilPencil, cilSync, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { capitalizeFirstLetter, prettyDate } from '../../utils/formatting';
import DeleteModal from '../DeleteModal';
import Avatar from '../Avatar';

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
  toggleCreate,
  toggleEdit,
  refreshUsers,
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
    { key: 'avatar', label: t(''), _style: { width: '5%' } },
    { key: 'email', label: t('user.login_id'), _style: { width: '10%' } },
    { key: 'name', label: t('user.name'), _style: { width: '10%' } },
    { key: 'userRole', label: t('user.user_role'), _style: { width: '5%' } },
    { key: 'lastLogin', label: t('user.last_login'), _style: { width: '10%' } },
    { key: 'validated', label: t('user.validated'), _style: { width: '5%' } },
    { key: 'description', label: t('user.description') },
    {
      key: 'user_details',
      label: '',
      _style: { width: '3%' },
      sorter: false,
      filter: false,
    },
    {
      key: 'user_delete',
      label: '',
      _style: { width: '3%' },
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
            <CCol xs={3}>
              <CRow>
                <CCol xs={6}>
                  <div className="text-right">
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
                  </div>
                </CCol>
                <CCol xs={6}>
                  <div className="text-right">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      onClick={toggleCreate}
                      block
                    >
                      {t('user.create')}
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow className="pb-3 pr-2">
            <CCol />
            <CCol xs={1} className="text-right">
              <div>
                <CPopover content={t('common.refresh')}>
                  <CButton onClick={refreshUsers} color="primary" variant="outline">
                    <CIcon name="cil-sync" content={cilSync} />
                  </CButton>
                </CPopover>
              </div>
            </CCol>
          </CRow>
          <CDataTable
            items={users}
            fields={fields}
            loading={loading}
            hover
            border
            scopedSlots={{
              avatar: (item) => (
                <td className="text-center">
                  <Avatar src={item.avatar} fallback={item.email} />
                </td>
              ),
              name: (item) => (
                <td>
                  <p style={{ width: 'calc(10vw)' }} className="text-truncate">
                    {item.name}
                  </p>
                </td>
              ),
              validated: (item) => (
                <td className="text-center">
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
              description: (item) => (
                <td>
                  <CPopover
                    content={item.description ? item.description : t('common.na')}
                    placement="top"
                  >
                    <p style={{ width: 'calc(20vw)' }} className="text-truncate">
                      {item.description}
                    </p>
                  </CPopover>
                </td>
              ),
              user_details: (item) => (
                <td className="text-center">
                  <CPopover content={t('common.edit')}>
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => toggleEdit(item.Id)}
                    >
                      <CIcon name="cil-pencil" content={cilPencil} size="sm" />
                    </CButton>
                  </CPopover>
                </td>
              ),
              user_delete: (item) => (
                <td className="text-center">
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
  toggleCreate: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  refreshUsers: PropTypes.func.isRequired,
};

export default React.memo(UserListTable);
