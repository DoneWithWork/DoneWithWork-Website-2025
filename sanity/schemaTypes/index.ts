import { type SchemaTypeDefinition } from 'sanity'
import { blog } from './blog'
import { project } from './project'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, project],
}
