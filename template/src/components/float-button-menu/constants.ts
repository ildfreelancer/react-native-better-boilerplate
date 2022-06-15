/**
 * @name Constants
 *
 * @description
 * Constant values that are used with the FAB and SubButton
 */

/**
 * The starting position of the FAB. We keep it at 0
 * to because that is the relative position it starts
 * at once it is mounted.
 */
export const FAB_STARTING_POSITION = 0

/**
 * FAB styling:
 * These will create a circle for us and
 * place it 30 points away from the edge of the screen.
 * Try changing the width value!
 */
export const FAB_WIDTH = 48
export const FAB_HEIGHT = FAB_WIDTH
export const FAB_BORDER_RADIUS = FAB_WIDTH / 2
export const FAB_BACKGROUND_COLOR = '#0066FF'
export const FAB_MARGIN = 34

/**
 * FAB Animation Properties
 */
export const FAB_ROTATION_OPEN = 45
export const FAB_CHILDREN_OPACITY_OPEN = 1
export const FAB_CHILDREN_POSITION_Y_OPEN = 0
export const FAB_PLUS_TRANSLATE_Y_OPEN = -3

/**
 * FAB Children Container Animation Properties
 */
export const FAB_CHILDREN_OPACITY_CLOSE = 0
export const FAB_CHILDREN_POSITION_Y_CLOSE = 30
export const FAB_ROTATION_CLOSE = 0
export const FAB_PLUS_TRANSLATE_Y_CLOSE = -2

/**
 * SubButton Styling
 */
export const SUBBTN_WIDTH = 175
export const SUBBTN_HEIGHT = 48
export const SUBBTN_BORDER_RADIUS = 12
export const SUBBTN_BACKGROUND_COLOR = '#1B746B'

/**
 * SubButton Press Event Listener Key
 */
export const SUBBTN_TAP_EVENT = 'SUBBTN_TAP_EVENT'
