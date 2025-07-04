import useTQuery from '@/hooks/useTQuery';

import { procureStoreQK } from './queryKeys';

export const useItemWorkOrder = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: procureStoreQK.itemWorkOrder(query ? query : ''),
		url: query ? `/procure/item-work-order?${query}` : `/procure/item-work-order`,
	});

export const useItemWorkOrderByVendorUUID = <T>(vendor_uuid: string) =>
	useTQuery<T>({
		queryKey: procureStoreQK.itemWorkOrderByVendorUUID(vendor_uuid),
		url: `/procure/item-work-order?vendor_uuid=${vendor_uuid}`,
		enabled: !!vendor_uuid,
	});

export const useItemWorkOrderByDetails = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: procureStoreQK.itemWorkOrderByUUID(uuid),
		url: `/procure/item-work-order-details/by/work-order-uuid/${uuid}`,
		enabled: !!uuid,
	});
