import connect from "../store"
import bigLayout from "../layouts/bigLayout"

export const pageWrapper = (mapStateToProps, mapDispatchToProps) => {
  return (page) => connect(mapStateToProps, mapDispatchToProps)(bigLayout(page))
}
