const otherQK = {
	all: () => ['other'],

	//* HR
	hr: () => [...otherQK.all(), 'hr'],

	//* Department
	department: () => [...otherQK.all(), 'department'],

	//* Designation
	designation: () => [...otherQK.all(), 'designation'],

	//* Faculty
	faculty: () => [...otherQK.all(), 'faculty'],

	//* User
	user: () => [...otherQK.all(), 'user'],

	userByQuery: (query: string) => [...otherQK.all(), 'byUserQuery', query],

	//* Teachers
	teachers: () => [...otherQK.all(), 'teachers'],

	//* Programs
	programs: () => [...otherQK.all(), 'programs'],
	//* Departments
	departments: (query: string) => [...otherQK.all(), 'departments', ...(query ? [query] : [])],

	//* Category
	category: () => [...otherQK.all(), 'category'],

	//* Sub Category
	subCategory: () => [...otherQK.all(), 'subCategory'],

	//* Purchase Cost Center
	purchaseCostCenter: () => [...otherQK.all(), 'purchaseCostCenter'],
	//* Sub Purchase Cost Center
	subPurchaseCostCenter: () => [...otherQK.all(), 'subPurchaseCostCenter'],

	//* Vendor
	vendor: () => [...otherQK.all(), 'vendor'],

	//* Internal Cost Center
	internalCostCenter: () => [...otherQK.all(), 'internalCostCenter'],
	//* Item
	item: () => [...otherQK.all(), 'item'],

	// * Course
	course: () => [...otherQK.all(), 'course'],

	// * Semester
	semester: () => [...otherQK.all(), 'semester'],
};

export default otherQK;
