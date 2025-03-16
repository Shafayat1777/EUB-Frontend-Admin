import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { useSortable } from '@dnd-kit/sortable';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { officeColumns } from '../_config/columns';
import { IOfficeTableData } from '../_config/columns/columns.type';
import { type1FacetedFilters } from '../_config/columns/facetedFilters';
import { usePortfolioOffice } from '../_config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const Office = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = usePortfolioOffice<IOfficeTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Portfolio/Office', url, 'portfolio__office'), [url]);

	const handleCreate = () => navigate('/portfolio/office/create');
	const handleUpdate = (row: Row<IOfficeTableData>) => {
		navigate(`/portfolio/office/${row.original.uuid}/update`);
	};

	// Delete Modal state
	// Single Delete Item
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Single Delete Handler
	const handleDelete = (row: Row<IOfficeTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.uuid,
		});
	};
	const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
		const { attributes, listeners } = useSortable({
			id: rowId,
		});
		return (
			// Alternatively, you could set these attributes on the rows themselves
			<button {...attributes} {...listeners}>
				🟰
			</button>
		);
	};
	// Table Columns
	const columns = officeColumns(RowDragHandleCell);
	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				defaultVisibleColumns={{
					created_by_name: false,
					created_at: false,
					updated_at: false,
				}}
				title={pageInfo.getTitle()}
				clientRedirectUrl='/authorities/offices'
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
				// TODO: Update facetedFilters (OPTIONAL)
				facetedFilters={type1FacetedFilters}
			>
				{renderSuspenseModals([
					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url,
							deleteData,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Office;
