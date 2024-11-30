<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Link } from '../types'
import { RouterLink } from 'vue-router'
import { useStore } from '@/stores/info'

const store = useStore()

const city = ref('')
const cities = [
  {
    value: 'Москва',
  },
  {
    value: 'Казань',
  },
  {
    value: 'Новосибирск',
  },
  {
    value: 'Сочи',
  },
	{
    value: 'Урюпинск',
  },
]

interface Props {
	/**
	 * Ссылки для навигации
	 */
	navLinks: Link[]
}

const props = defineProps<Props>()

watch(city, () => {
	store.chooseCity(city.value)	
})
</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink v-for="(link, index) in navLinks" :key="index" :to="link.to">{{ link.name }}</RouterLink>
            </nav>
						<el-select v-model="city" placeholder="Выберите город" style="width: 160px">
							<el-option
								v-for="city in cities"
								:key="city.value"
								:label="city.value"
								:value="city.value"
							/>
						</el-select>
        </div>
    </header>
</template>

<style lang="scss">
nav {
  font-size: 12px;
  text-align: center;

	a {
		display: inline-block;
		padding: 10px 30px;
		border: 1px solid var(--vt-c-indigo);
		text-decoration: none;
		color: var(--el-text-color-placeholder);
		transition: 0.4s;

		&:hover {
			box-shadow: 0 0 0 1px var(--el-border-color-hover) inset;
		}
	}
}

header {
	padding: 20px;
  line-height: 1.5;
  max-height: 100vh;

	.wrapper {
		display: flex;
    justify-content: center;
	}
}

nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

.block-col-2 .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.block-col-2 .el-dropdown-link {
  display: flex;
  align-items: center;
}

.el-select {
	position: absolute;
	right: 20px;

	&__wrapper {
		padding: 12px;
		border: 1px solid var(--vt-c-indigo);
		border-radius: 0;
		background-color: inherit;
	}

	&__wrapper.is-focused {
		box-shadow: 0 0 0 1px var(--el-border-color-hover) inset;
	}

	&__placeholder {
		color: var(--el-text-color-placeholder);
	}
}

</style>