/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as langImport } from './routes/:lang'
import { Route as LangImport } from './routes/$lang'
import { Route as LangIndexImport } from './routes/$lang.index'
import { Route as LangAppIdImport } from './routes/$lang.$appId'

// Create/Update Routes

const langRoute = langImport.update({
  id: '/:lang',
  path: '/:lang',
  getParentRoute: () => rootRoute,
} as any)

const LangRoute = LangImport.update({
  id: '/$lang',
  path: '/$lang',
  getParentRoute: () => rootRoute,
} as any)

const LangIndexRoute = LangIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LangRoute,
} as any)

const LangAppIdRoute = LangAppIdImport.update({
  id: '/$appId',
  path: '/$appId',
  getParentRoute: () => LangRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/$lang': {
      id: '/$lang'
      path: '/$lang'
      fullPath: '/$lang'
      preLoaderRoute: typeof LangImport
      parentRoute: typeof rootRoute
    }
    '/:lang': {
      id: '/:lang'
      path: '/:lang'
      fullPath: '/:lang'
      preLoaderRoute: typeof langImport
      parentRoute: typeof rootRoute
    }
    '/$lang/$appId': {
      id: '/$lang/$appId'
      path: '/$appId'
      fullPath: '/$lang/$appId'
      preLoaderRoute: typeof LangAppIdImport
      parentRoute: typeof LangImport
    }
    '/$lang/': {
      id: '/$lang/'
      path: '/'
      fullPath: '/$lang/'
      preLoaderRoute: typeof LangIndexImport
      parentRoute: typeof LangImport
    }
  }
}

// Create and export the route tree

interface LangRouteChildren {
  LangAppIdRoute: typeof LangAppIdRoute
  LangIndexRoute: typeof LangIndexRoute
}

const LangRouteChildren: LangRouteChildren = {
  LangAppIdRoute: LangAppIdRoute,
  LangIndexRoute: LangIndexRoute,
}

const LangRouteWithChildren = LangRoute._addFileChildren(LangRouteChildren)

export interface FileRoutesByFullPath {
  '/$lang': typeof LangRouteWithChildren
  '/:lang': typeof langRoute
  '/$lang/$appId': typeof LangAppIdRoute
  '/$lang/': typeof LangIndexRoute
}

export interface FileRoutesByTo {
  '/:lang': typeof langRoute
  '/$lang/$appId': typeof LangAppIdRoute
  '/$lang': typeof LangIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/$lang': typeof LangRouteWithChildren
  '/:lang': typeof langRoute
  '/$lang/$appId': typeof LangAppIdRoute
  '/$lang/': typeof LangIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/$lang' | '/:lang' | '/$lang/$appId' | '/$lang/'
  fileRoutesByTo: FileRoutesByTo
  to: '/:lang' | '/$lang/$appId' | '/$lang'
  id: '__root__' | '/$lang' | '/:lang' | '/$lang/$appId' | '/$lang/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LangRoute: typeof LangRouteWithChildren
  langRoute: typeof langRoute
}

const rootRouteChildren: RootRouteChildren = {
  LangRoute: LangRouteWithChildren,
  langRoute: langRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/$lang",
        "/:lang"
      ]
    },
    "/$lang": {
      "filePath": "$lang.tsx",
      "children": [
        "/$lang/$appId",
        "/$lang/"
      ]
    },
    "/:lang": {
      "filePath": ":lang.tsx"
    },
    "/$lang/$appId": {
      "filePath": "$lang.$appId.tsx",
      "parent": "/$lang"
    },
    "/$lang/": {
      "filePath": "$lang.index.tsx",
      "parent": "/$lang"
    }
  }
}
ROUTE_MANIFEST_END */
