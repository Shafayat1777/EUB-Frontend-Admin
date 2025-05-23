import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';

import { IFormSelectOption } from '@core/form/types';

type FieldReadonly = {
	type: 'readOnly';
};
type FieldCustom = {
	type: 'custom';
	component: (index: number) => React.ReactNode;
};

type FieldText = {
	type: 'text';
	// inputType?: 'text' | 'number';
	placeholder?: string;
	disabled?: boolean;
};
type FieldTextArea = {
	type: 'textarea';
	placeholder?: string;
	disabled?: boolean;
};
type FieldNumber = {
	type: 'number';
	placeholder?: string;
	disabled?: boolean;
};

type FieldSelect = {
	type: 'select';
	placeholder?: string;
	options: IFormSelectOption[];
	excludeOptions?: string[];
	unique?: boolean;
	disabled?: boolean;
	onChange?: (option?: any, field?: any) => void;
};

type FieldJoinInputUnit = {
	type: 'join-input-unit';
	placeholder?: string;
	unit: (index: number) => string;
	disabled?: boolean;
	inputType?: string;
};

type FieldImage = {
	type: 'image';
	placeholder?: string;
	isUpdate?: boolean;
};

type FieldCheckbox = {
	type: 'checkbox';
	placeholder?: string;
	isUpdate?: boolean;
	disabled?: boolean;
};

type FieldDate = {
	type: 'date';
	placeholder?: string;
	isUpdate?: boolean;
	disabled?: boolean;
};

export type FieldDef = {
	header: string;
	accessorKey: string;
	className?: string;
	isLoading?: boolean;
	hidden?: boolean;
} & (
	| FieldText
	| FieldNumber
	| FieldSelect
	| FieldReadonly
	| FieldCustom
	| FieldJoinInputUnit
	| FieldTextArea
	| FieldImage
	| FieldCheckbox
	| FieldDate
);

export interface DynamicFieldsProps {
	title: string;
	form: UseFormReturn<any>;
	fieldName: string;
	fieldDefs: FieldDef[];
	extraHeader?: React.ReactNode;
	handleAdd?: () => void;
	fields: FieldArrayWithId<any>[];
	viewAs?: 'default' | 'spreadsheet';
	children?: React.ReactNode;
}
