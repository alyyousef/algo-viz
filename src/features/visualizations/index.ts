/**
 * Algorithm Visualisation Registry
 *
 * Each entry maps a DSA route (e.g. "/dsa/2-core-algorithms/...") to a lazy-loaded
 * React component that renders an interactive visualisation.
 *
 * HOW TO ADD A NEW VISUALISATION:
 *   1. Create the component in the appropriate subdirectory
 *      (graph/, sorting/, searching/, tree/, or a new category/).
 *   2. Add an entry below keyed to the exact route string.
 *
 * Example:
 *   import { lazy } from 'react'
 *   '/dsa/2-core-algorithms/1-sorting-searching/bubble-sort': lazy(
 *     () => import('./sorting/BubbleSortVisualisation')
 *   ),
 */

import type { ComponentType } from 'react'

export type VisualisationComponent = ComponentType<VisualisationProps>

export interface VisualisationProps {
  /** The DSA route this visualisation belongs to */
  route: string
}

/**
 * Registry of route → lazy visualisation component.
 * Currently empty — add entries as visualisations are built.
 */
const visualisationRegistry: Record<string, VisualisationComponent> = {
  // '/dsa/2-core-algorithms/1-sorting-searching/bubble-sort': lazy(
  //   () => import('./sorting/BubbleSortVisualisation')
  // ),
}

/**
 * Returns the visualisation component for the given route, or undefined if
 * no interactive visualisation has been built yet.
 */
export function getVisualisation(route: string): VisualisationComponent | undefined {
  return visualisationRegistry[route]
}
