import React from "react"
import PropTypes from "prop-types"
import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { create } from "jss"
import { jssPreset, StylesProvider } from "@material-ui/styles"
import HyperobjektTheme from "../../gatsby-theme-hyperobjekt-core/theme"
import MDXPreview from "./MDXPreview"
class DefaultPagePreview extends React.Component {
  state = {
    ready: false,
  }

  handleRef = (ref) => {
    const ownerDocument = ref ? ref.ownerDocument : null
    this.setState({
      ready: true,
      jss: create({
        ...jssPreset(),
        insertionPoint: ownerDocument
          ? ownerDocument.querySelector("#demo-frame-jss")
          : null,
      }),
      sheetsManager: new Map(),
    })
  }

  theme = createMuiTheme(HyperobjektTheme({ isDarkMode: false }))

  render() {
    const { entry, widgetFor } = this.props
    const data = entry.getIn(["data"]).toJS()

    const theme = {
      layout: {
        contentMaxWidth: 768,
        headerHeght: 80,
      },
      ...this.theme,
    }

    if (data) {
      return (
        <React.Fragment>
          <div id="demo-frame-jss" ref={this.handleRef} />
          {this.state.ready ? (
            <StylesProvider
              jss={this.state.jss}
              sheetsManager={this.state.sheetsManager}
            >
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div style={{ padding: 24, margin: "auto", maxWidth: 768 }}>
                  <MDXPreview entry={entry} widgetFor={widgetFor} />
                </div>
              </ThemeProvider>
            </StylesProvider>
          ) : null}
        </React.Fragment>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

DefaultPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default DefaultPagePreview
