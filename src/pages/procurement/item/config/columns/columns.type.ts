// * Item
export type IItemTableData = {
	index: number;
	uuid: string;
	name: string;
	store: string;
	quantity: number;
	threshold: number;
	lead_time: number;
	purchase_cost_center_name: string;
	vendor_price: number;
	price_validity: number;
	remarks: string;
};
//* Item Vendor
export type IItemVendorTableData = {
	index: number;
	uuid: string;
	vendor_uuid: string;
	vendor_name: string;
	is_active: boolean;
};
