import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { CButton, CDataTable, CLink, CPopover, CButtonToolbar, CSelect } from '@coreui/react';
import { cilPencil, cilPlus } from '@coreui/icons';
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
  entity,
  onlyEntity,
  unassign,
  assignToEntity,
  toggleEditModal,
  deleteTag,
  onlyUnassigned,
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
                      disabled={
                        entity === null || onlyEntity || item.entity !== '' || item.venue !== ''
                      }
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
                <DeleteButton t={t} tag={item} deleteTag={deleteTag} hideTooltips={hideTooltips} />
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
};

InventoryTable.defaultProps = {
  page: '0',
  onlyEntity: false,
  entity: null,
};

export default InventoryTable;
