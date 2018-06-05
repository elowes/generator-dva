import React, { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import './style/index.css'
import styles from './style/index.scss'

@connect(state => ({
  homepage: state.homepage,
  loading: state.loading
}))
class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  returnRandomMovieName () {
    const { homepage } = this.props
    const arr = homepage.movietop250.subjects.map(i => i.title)
    return arr.slice(0, 5).join('、')
  }

  render () {
    const { homepage, loading } = this.props
    return <div>
      <header className={styles.header}>
        <img src={require('../../assets/react-logo.svg')} />
        <h1>Welcome to React&dva</h1>
      </header>
      <p className={styles.intro}>
        {
          (loading.global || !homepage.movietop250)
            ? '获取豆瓣热门电影排行榜 TOP5'
            : this.returnRandomMovieName()
        }
      </p>
    </div>
  }
}

HomePage.propTypes = {
  homepage: PropTypes.object,
  loading: PropTypes.object
}

export default HomePage
