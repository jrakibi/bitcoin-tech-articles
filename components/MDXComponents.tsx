import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import ScriptStackVisualizer from './script-visualizer/scriptVisualizer'
import ExpandableSection from './script-visualizer/expandable-section'
import CodeEditor from './CodeEditor'
import SvgDisplay from './script-visualizer/SvgDisplay'
import Iframe from './script-visualizer/Iframe'
import TransactionSerializer from './script-visualizer/TransactionSerializer'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  ExpandableSection,
  ScriptStackVisualizer,
  CodeEditor,
  SvgDisplay,
  Iframe,
  TransactionSerializer,
}
