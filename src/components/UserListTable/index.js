import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CPopover,
  CSelect,
} from '@coreui/react';
import { cilBan, cilCheckCircle, cilPencil, cilPlus, cilSync, cilTrash } from '@coreui/icons';
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
  currentPage,
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
    { key: 'avatar', label: t(''), _style: { width: '1%' } },
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
          <div className="d-flex flex-row-reverse">
            <div className="pl-2">
              <CPopover content={t('common.refresh')}>
                <CButton onClick={refreshUsers} color="primary" variant="outline">
                  <CIcon name="cil-sync" content={cilSync} />
                </CButton>
              </CPopover>
            </div>
            <div className="pl-2">
              <CPopover content={t('user.create')}>
                <CButton color="primary" variant="outline" onClick={toggleCreate} block>
                  <CIcon name="cil-plus" content={cilPlus} />
                </CButton>
              </CPopover>
            </div>
          </div>
        </CCardHeader>
        <CCardBody className="p-0">
          <CDataTable
            items={users}
            fields={fields}
            loading={loading}
            hover
            border
            scopedSlots={{
              avatar: (item) => (
                <td className="text-center align-middle">
                  <Avatar src={item.avatar} fallback={item.email} />
                </td>
              ),
              email: (item) => <td className=" align-middle">{item.email}</td>,
              name: (item) => (
                <td className="align-middle">
                  <div style={{ width: 'calc(10vw)' }} className="text-truncate align-middle">
                    {item.name}
                  </div>
                </td>
              ),
              lastLogin: (item) => (
                <td className="align-middle">{item.lastLogin ? prettyDate(item.lastLogin) : ''}</td>
              ),
              validated: (item) => (
                <td className="text-center align-middle">
                  <CPopover
                    content={item.validated ? t('user.validated') : t('user.not_validated')}
                  >
                    {getValidatedIcon(item.validated)}
                  </CPopover>
                </td>
              ),
              userRole: (item) => (
                <td className="align-middle">
                  {item.userRole ? capitalizeFirstLetter(item.userRole) : ''}
                </td>
              ),
              description: (item) => (
                <td className="align-middle">
                  <CPopover
                    content={item.description ? item.description : t('common.na')}
                    placement="top"
                  >
                    <div style={{ width: 'calc(20vw)' }} className="text-truncate align-middle">
                      {item.description}
                    </div>
                  </CPopover>
                </td>
              ),
              user_details: (item) => (
                <td className="text-center align-middle">
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
                <td className="text-center align-middle">
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
          <div className="d-flex flex-row pl-3">
            <div className="pr-3">
              <ReactPaginate
                previousLabel="← Previous"
                nextLabel="Next →"
                pageCount={pageCount}
                onPageChange={setPage}
                forcePage={currentPage}
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
            <p className="pr-2 mt-1">{t('common.items_per_page')}</p>
            <div style={{ width: '100px' }} className="px-2">
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
          </div>
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
  currentPage: PropTypes.number,
  setPage: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  deleteLoading: PropTypes.bool.isRequired,
  toggleCreate: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  refreshUsers: PropTypes.func.isRequired,
};

UserListTable.defaultProps = {
  currentPage: 0,
};

export default React.memo(UserListTable);
