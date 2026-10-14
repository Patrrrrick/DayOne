# Reference visual refresh

Applied the supplied original Day One screenshots as the visual authority. The implementation remains a mobile HTML prototype. Design variance 4/10, motion 2/10, density 5/10.

Shared `visual-theme.css` styles both the shell and embedded Journey. Roles: 24px page titles, 18px navigation/section titles, 16px card titles, 14px body, 12px metadata, 11px compact labels. Background #F8F8FF, surface #FFFFFF, accent #1554E8, primary action #0645BC, soft #E7ECFF, ink #192132. Light borders, low elevation, 12–15px card/button radii, pill categories, compact icon containers. Existing 48px control targets, reduced motion, safe areas and icon-only navigation retained.

No copy, page content, information ordering, assets, route data or app event handlers changed. A Journey resize callback now refreshes the phase indicator when its previously hidden iframe becomes visible.

Verified at 402×874: Home, plan, route selection, custom editor, route preview, navigation, completion, Account, Journey overview and detail. Checked shell overflow at 320×667 on Account and Journey detail. Browser navigation demo completed successfully. Physical-device keyboard, OS text scaling and screen readers were not re-tested in this visual revision.
