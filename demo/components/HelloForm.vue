<template>
	<div class="hello">
		<viewer v-if="mode==='viewer'" :schemas="schemas" :data="data"></viewer>
		<editor v-if="mode==='editor'" :schemas="schemas" :data="data"></editor>
	</div>
</template>

<script>
import Viewer from './Viewer.vue'
import Editor from './Editor.vue'

export default {
	name: 'HelloForm',
	components: { Viewer, Editor },
	data() {
		return {
			mode: 'viewer',
			data: {
				s1: '这是1条单行数据',
				s2: '设置1条多行数据',
				s3: 'v1',
				s4: ['v2'],
				s5: []
			},
			schemas: [
				{ id: 's1', type: 'shorttext', title: '单行填写题' },
				{ id: 's2', type: 'longtext', title: '多行填写题' },
				{
					id: 's3',
					type: 'single',
					title: '单选题',
					ops: [
						{ v: 'v1', l: '选项1' },
						{ v: 'v2', l: '选项2' },
						{ v: 'v3', l: '选项3' }
					]
				},
				{
					id: 's4',
					type: 'multiple',
					title: '多选题',
					ops: [
						{ v: 'v1', l: '选项1' },
						{ v: 'v2', l: '选项2' },
						{ v: 'v3', l: '选项3' }
					]
				},
				{ id: 's5', type: 'image', title: '图片' }
			]
		}
	}
}
</script>