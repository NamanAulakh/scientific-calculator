/* eslint-disable */
import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
// import { isNan } from 'lodash'
import { connect } from 'react-redux'
import styles from './styles'

class Cubic extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = { root1: '0', root2: '0', root3: '0', a: '1', b: '0', c: '0', d: '0' }

    this.solve = this.solve.bind(this)
    this.solveCubic = this.solveCubic.bind(this)
    this.cuberoot = this.cuberoot.bind(this)
  }

  cuberoot(x) {
    const y = Math.pow(Math.abs(x), 1 / 3)
    // console.log(y, 'cuberoot')
    return x < 0 ? -y : y
  }

  solveCubic(a, b, c, d) {
    if (Math.abs(a) < 1e-8) {
      // Quadratic case, ax^2+bx+c=0
      a = b
      b = c
      c = d
      if (Math.abs(a) < 1e-8) {
        // Linear case, ax+b=0
        a = b
        b = c
        if (Math.abs(a) < 1e-8) {
          // Degenerate case
          return []
        }
        return [-b / a]
      }

      var D = b * b - 4 * a * c
      if (Math.abs(D) < 1e-8) return [-b / (2 * a)]
      else if (D > 0) return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)]
      return []
    }

    // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
    const p = (3 * a * c - b * b) / (3 * a * a)
    const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a)
    let roots

    if (Math.abs(p) < 1e-8) {
      // p = 0 -> t^3 = -q -> t = -q^1/3
      roots = [this.cuberoot(-q)]
      // console.log(roots, '!!!!!!!!')
    } else if (Math.abs(q) < 1e-8) {
      // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
      roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : [])
      // console.log(roots, '@@@@@@@@')
    } else {
      var D = q * q / 4 + p * p * p / 27
      if (Math.abs(D) < 1e-8) {
        // D = 0 -> two roots
        roots = [-1.5 * q / p, 3 * q / p]
        // console.log(roots, '^^^^^^^^^^^')
      } else if (D > 0) {
        // Only one real root
        var u = this.cuberoot(-q / 2 - Math.sqrt(D))
        roots = [u - p / (3 * u)]
        // console.log(roots, '((((((((()))))))))')
      } else {
        // D < 0, three roots, but needs to use complex numbers/trigonometric solution
        // console.log('&*&*&*&*&*&*&*&*&*&*&*&')
        var u = 2 * Math.sqrt(-p / 3)
        const t = Math.acos(3 * q / p / u) / 3 // D < 0 implies p < 0 and acos argument in [-1..1]
        const k = 2 * Math.PI / 3
        roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)]
        // console.log(roots, '&&&&&&&&&&&&&&')
      }
    }

    // console.log(roots, '......roots.........')
    // Convert back from depressed cubic
    for (let i = 0; i < roots.length; i++) roots[i] -= b / (3 * a)
    // console.log(roots, '......roots: after.........')
    return roots
  }

  solve() {
    const { a, b, c, d } = this.state

    const res = this.solveCubic(a, b, c, d)
    // console.log(res, '&*&*&*&*&*&*&*&*&**&')

    this.setState({
      root1: res[0] ? res[0] : '-',
      root2: res[1] ? res[1] : '-',
      root3: res[2] ? res[2] : '-',
    })

    // if (res.length < 3) return this.setState({ root1: 0, root2: 0, root3: 0 })
    //
    // this.setState({ root1: res[0], root2: res[1], root3: res[2] })
  }

  render() {
    const { navigation } = this.props
    const { root1, root2, root3 } = this.state
    // console.log(this.state, '*****Cubic*****')
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.content}>
          <View style={styles.main}>
            <Text style={styles.text}>Solution of Cubic Equations:</Text>
            <Text style={Object.assign({}, styles.text, { alignSelf: 'center' })}>
              Ax^3 + Bx^2 + Cx + D
            </Text>

            <View style={styles.horz}>
              <Text style={styles.text}>A = </Text>

              <TextInput
                style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1, padding: 1 }}
                onChangeText={a => this.setState({ a })}
                value={this.state.a}
              />
            </View>

            <View style={styles.horz}>
              <Text style={styles.text}>B = </Text>

              <TextInput
                style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1, padding: 1 }}
                onChangeText={b => this.setState({ b })}
                value={this.state.b}
              />
            </View>

            <View style={styles.horz}>
              <Text style={styles.text}>C = </Text>

              <TextInput
                style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1, padding: 1 }}
                onChangeText={c => this.setState({ c })}
                value={this.state.c}
              />
            </View>

            <View style={styles.horz}>
              <Text style={styles.text}>D = </Text>

              <TextInput
                style={{ flex: 1, height: 30, borderColor: 'gray', borderWidth: 1, padding: 1 }}
                onChangeText={d => this.setState({ d })}
                value={this.state.d}
              />
            </View>

            <TouchableOpacity style={styles.solve} onPress={this.solve}>
              <Text style={styles.text}>Solve</Text>
            </TouchableOpacity>

            <View style={styles.horz}>
              <Text style={styles.text}>X1 = </Text>
              <ScrollView horizontal>
                <Text style={styles.text}>{root1}</Text>
              </ScrollView>
            </View>

            <View style={styles.horz}>
              <Text style={styles.text}>X2 = </Text>
              <ScrollView horizontal>
                <Text style={styles.text}>{root2}</Text>
              </ScrollView>
            </View>

            <View style={styles.horz}>
              <Text style={styles.text}>X3 = </Text>
              <ScrollView horizontal>
                <Text style={styles.text}>{root3}</Text>
              </ScrollView>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={{
            // flex: 1,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00bfff',
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.text}>Go to prev screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

// flow-disable-line
export default connect(null, null)(Cubic)
