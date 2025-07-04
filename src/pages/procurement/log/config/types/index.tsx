import { IDefaultAddOrUpdateProps } from '@/types';

import '../columns/columns.type';

import {
	IITemRequestTableData,
	IItemRequisitionTableData,
	IITemTransferTableData,
	IItemWorkOrderEntryTableData,
} from '../columns/columns.type';

//* Item Transfer
export interface IItemTransferAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IITemTransferTableData | null;
}
//* Item Work Order Entry
export interface IItemWorkOrderAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IItemWorkOrderEntryTableData | null;
}
//* Item Requisition
export interface IItemRequisitionAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IItemRequisitionTableData | null;
}
export interface IItemRequestAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IITemRequestTableData | null;
}
