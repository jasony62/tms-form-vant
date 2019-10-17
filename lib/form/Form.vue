<template>
	<form>
		<tms-form-schema
			v-for="schema in schemas"
			:key="schema.id"
			:schema="schema"
			:data="data"
			:readonly="readonly"
		></tms-form-schema>
	</form>
</template>
<script>
import Vue from 'vue'
import {
	CellGroup,
	Cell,
	Field,
	RadioGroup,
	Radio,
	CheckboxGroup,
	Checkbox,
	Uploader,
	Image
} from 'vant'
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Uploader)
Vue.use(Image)

import Schema from './schema'

const TmsFormSchema = Vue.component('tms-form-schema', new Schema().component)

export default {
	props: {
		data: { type: Object },
		schemas: { type: Array },
		readonly: { type: Boolean }
	},
	components: {
		TmsFormSchema
	}
}
</script>