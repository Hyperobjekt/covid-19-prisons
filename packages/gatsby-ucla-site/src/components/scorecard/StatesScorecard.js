import React from "react"
import PropTypes from "prop-types"
import useScorecardData from "../../common/hooks/use-scorecard-data"

const StatesScorecard = (props) => {
  const data = useScorecardData()

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

StatesScorecard.propTypes = {}

export default StatesScorecard
