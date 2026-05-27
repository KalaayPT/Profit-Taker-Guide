<script setup lang="ts">
import theme from '#build/ui/content/content-surround'
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { createReusableTemplate } from '@vueuse/core'
import type { Collections, ContentNavigationItem } from '@nuxt/content'
import { useAppConfig } from '#imports'
import { useComponentProps } from '#ui/composables/useComponentProps'
import { useLocale } from '#ui/composables/useLocale'
import { tv } from '#ui/utils/tv'
import ULink from '#ui/components/Link.vue'
import UIcon from '#ui/components/Icon.vue'
import { getCustomPageSurround } from '~/utils/sidebarNavigation'

defineOptions({ inheritAttrs: false })

const _props = defineProps<{
  as?: any
  prevIcon?: string
  nextIcon?: string
  surround?: ContentNavigationItem[]
  class?: any
  ui?: Record<string, any>
}>()

defineSlots<{
  default?: (props: Record<string, unknown>) => any
  link?: (props: Record<string, unknown>) => any
  'link-leading'?: (props: Record<string, unknown>) => any
  'link-title'?: (props: Record<string, unknown>) => any
  'link-description'?: (props: Record<string, unknown>) => any
}>()

const route = useRoute()
const { locale, isEnabled } = useDocusI18n()
const { dir } = useLocale()
const appConfig = useAppConfig()
const props = useComponentProps('contentSurround', _props)
const collectionName = computed(() => isEnabled.value ? `docs_${locale.value}` : 'docs')

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{
  link?: ContentNavigationItem
  icon?: string
  direction: 'left' | 'right'
}>()

const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.contentSurround || {} })())
const prevIcon = computed(() => props.prevIcon || (dir.value === 'rtl' ? appConfig.ui.icons.arrowRight : appConfig.ui.icons.arrowLeft))
const nextIcon = computed(() => props.nextIcon || (dir.value === 'rtl' ? appConfig.ui.icons.arrowLeft : appConfig.ui.icons.arrowRight))

const customSurround = computed(() => getCustomPageSurround(route.path))

const { data: customSurroundWithDescriptions } = await useAsyncData(
  () => `custom-surround-${collectionName.value}-${route.path}`,
  async () => {
    if (!customSurround.value) {
      return undefined
    }

    const [prev, next] = await Promise.all(customSurround.value.map(async (item) => {
      if (!item?.path) {
        return undefined
      }

      const page = await queryCollection(collectionName.value as keyof Collections)
        .path(item.path)
        .first()

      if (!page) {
        return item
      }

      return {
        title: page.title || item.title,
        description: page.description,
        path: page.path,
      } satisfies ContentNavigationItem
    }))

    return [prev, next] as [ContentNavigationItem | undefined, ContentNavigationItem | undefined]
  },
  {
    watch: [collectionName, () => route.path],
  },
)

const resolvedSurround = computed(() => {
  return customSurroundWithDescriptions.value || props.surround
})
</script>

<template>
  <DefineLinkTemplate v-slot="{ link, icon, direction }">
    <ULink
      v-if="link"
      :to="link.path"
      raw
      data-slot="link"
      :class="ui.link({ class: [props.ui?.link, link.ui?.link, link.class], direction })"
    >
      <slot
        name="link"
        :link="link"
        :ui="ui"
      >
        <div
          data-slot="linkLeading"
          :class="ui.linkLeading({ class: [props.ui?.linkLeading, link.ui?.linkLeading] })"
        >
          <slot
            name="link-leading"
            :link="link"
            :ui="ui"
          >
            <UIcon
              :name="link.icon || icon"
              data-slot="linkLeadingIcon"
              :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], direction })"
            />
          </slot>
        </div>

        <p
          data-slot="linkTitle"
          :class="ui.linkTitle({ class: [props.ui?.linkTitle, link.ui?.linkTitle] })"
        >
          <slot
            name="link-title"
            :link="link"
            :ui="ui"
          >
            {{ link.title }}
          </slot>
        </p>

        <p
          data-slot="linkDescription"
          :class="ui.linkDescription({ class: [props.ui?.linkDescription, link.ui?.linkDescription] })"
        >
          <slot
            name="link-description"
            :link="link"
            :ui="ui"
          >
            {{ link.description }}
          </slot>
        </p>
      </slot>
    </ULink>

    <span
      v-else
      class="hidden sm:block"
    >&nbsp;</span>
  </DefineLinkTemplate>

  <Primitive
    v-if="resolvedSurround"
    :as="props.as"
    v-bind="$attrs"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
  >
    <ReuseLinkTemplate
      :link="resolvedSurround[0]"
      :icon="prevIcon"
      direction="left"
    />
    <ReuseLinkTemplate
      :link="resolvedSurround[1]"
      :icon="nextIcon"
      direction="right"
    />
  </Primitive>
</template>
