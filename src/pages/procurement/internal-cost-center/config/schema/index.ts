import { z } from 'zod';

import { BOOLEAN_REQUIRED, NUMBER_REQUIRED, STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

// * Internal Cost Center Schema
export const INTERNAL_COST_CENTER_SCHEMA = z.object({
	name: STRING_REQUIRED,
	authorized_person_uuid: STRING_REQUIRED,
	can_submitted_person_uuid: STRING_REQUIRED,
	from: STRING_REQUIRED,
	to: STRING_REQUIRED,
	department: z.enum([
		'chairman_bot',
		'vice_chancellor',
		'treasurer',
		'pni',
		'pnd',
		'civil_engineering',
		'admission_office',
		'controller_office',
		'exam_c_01',
		'exam_c_02',
		'account_c_01',
		'account_c_02',
		'cse',
		'registrar(hod)',
		'additional_registrar',
		'additional_registrar_c_01',
		'additional_registrar_c_02',
		'english',
		'businessadministration',
		'library ',
		'ipe&_iqac',
		'textile_engineering',
		'proctor_office',
		'eee',
		'fde',
		'medical_centre',
		'economics',
		'mdgs',
		'thm',
		'mathematics ',
		'pcu',
		'program_coordination_manager',
		'program_coordination_asst_manager',
		'sr_program_coordination_incharge',
		'physics',
		'chemistry',
		'security_director',
		'logistics',
		'reception_gate',
		'ict',
		'law',
	]),
	budget: NUMBER_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const INTERNAL_COST_CENTER_NULL: Partial<IInternalCostCenter> = {
	name: '',
	authorized_person_uuid: '',
	can_submitted_person_uuid: '',
	from: '',
	to: '',
	department: undefined,
	budget: 0,
	remarks: '',
};

export type IInternalCostCenter = z.infer<typeof INTERNAL_COST_CENTER_SCHEMA>;
