import { lazy } from 'react';
import { IRoute } from '@/types';

const Category = lazy(() => import('@/pages/procurement/category'));
const SubCategory = lazy(() => import('@/pages/procurement/subcategory'));

const procurementRoutes: IRoute[] = [
	{
		name: 'Procurement',
		children: [
			{
				name: 'Category',
				path: '/procurement/category',
				element: <Category />,
				page_name: 'procurement__category',
				actions: ['create', 'read', 'update', 'delete'],
			},
			{
				name: 'Sub Category',
				path: '/procurement/subcategory',
				element: <SubCategory />,
				page_name: 'procurement__subcategory',
				actions: ['create', 'read', 'update', 'delete'],
			},
		],
	},
];
export default procurementRoutes;
