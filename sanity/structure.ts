import { DocumentIcon, FolderIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('blog').title('Blog').icon(DocumentIcon),
      S.documentTypeListItem('project').title('Project').icon(FolderIcon),
    ])
