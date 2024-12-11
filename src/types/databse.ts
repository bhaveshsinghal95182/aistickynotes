// types.ts
export interface CRUDOperations {
  create: (payload: object, id?: string) => Promise<any>;
  update: (id: string | number, payload: object) => Promise<any>;
  delete: (id: string) => Promise<any>;
  get: (id: string) => Promise<any>;
  list: (queries?: object) => Promise<any>;
}

export type DatabaseAPI = Record<string, CRUDOperations>;
