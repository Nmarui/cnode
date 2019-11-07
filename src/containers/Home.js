import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Todoing from './Todoing'
import {connect} from 'react-redux';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          postList: [],
          tagType: '',
        };
    }
    componentWillMount() {
        const type = this.props.match.params.type;
        this.setState({
          tagType: type || 'all',
        });
        this.getPostData(type).then(res => {
          if (res.status === 200) {
            this.setState({
              postList: res.data.data,
            });
          } else {
            console.error(res.statusText);
          }
        }).catch(e => {
          console.warn(e);
        });
    }
    componentWillReceiveProps(nextProps) {
        const type = nextProps.match.params.type;
        this.setState({
            tagType: type || 'all',
        });
        if (this.state.tagType !== type) {
            this.getPostData(type).then(res => {
                if (res.status === 200) {
                this.setState({
                    postList: res.data.data,
                });
                } else {
                console.error(res.statusText);
                }
            }).catch(e => {
                console.warn(e);
            });
        }
    }
    getPostData(type) {
        return axios.get('https://cnodejs.org/api/v1',{
            params: {
                tab: type,
            }
        });
    }
    tabTypes(post) {
        const tab = post.tab;
        const map = {
          'top': '置顶',
          'share': '分享',
          'good': '精华',
          'ask': '问答',
          'job': '招聘',
        };
        if (post.top) {
          return map['top'];
        } else if (post.good) {
          return map['good'];
        } else {
          return map[tab];
        }
      }
    
      getRouteList() {
        const routeList = [
          { type: 'all', path: '/', text: '全部' },
          { type: 'good', path: '', text: '精华' },
          { type: 'share', path: '', text: '分享' },
          { type: 'ask', path: '', text: '问答' },
          { type: 'job', path: '', text: '招聘' },
          { type: 'test', path: '', text: '客户端测试' },
        ];
        return routeList.map((route) => (
          <Link
            to={route.path}
            key={route.path}
            className={this.state.tagType === route.type ? 'topic-tab current-tab' : 'topic-tab'}
          >
            {route.text}
          </Link>
        ));
    }

    render() {
        console.log(this.props)
        let {avatar_url,loginname} = this.props.userInfor;
        return (
            <div>
                <div>
                    <img src={avatar_url} alt=""/>
                    <p>{loginname}</p>
                </div>
                <Todoing/>
                <span title="回复数/"></span>
                <span title="点击数"></span>
                <span> eggjs的service中该如何调用model中实现的实例方法?</span>
                <span> koa项目中使用redis如何控制执行顺序</span>
                <span>$lookup 查询关联字段</span>
                <span>egg.js 一个model中如何导出多个schma，并在service中读取？</span>
                <span>sequelize 更新表结构的问题</span>
                <span>快速搭建论坛，用 NodeBB 搭建自己的社区，汇聚可爱的人们</span>
                <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
            </div>
        )
    }
}

export default connect(
    state=>(
        {
            userInfor: state.getUserInfor
        }
    )
)(Home);