import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from 'src/commons/config-hoc';
import { Row,Col,Card,message,Button,Space,Popconfirm } from 'antd'
import { Pagination } from 'src/commons/ra-lib';
import { preRouter,AJAX_PREFIXCONFIG } from 'src/commons/PRE_ROUTER'
import Header from '../../components/header'
import Footer from '../../components/footer'
import './style.less';
import 'braft-editor/dist/output.css'

const localStorage = window.localStorage;
const CODEMAP = JSON.parse(localStorage.getItem('login-user')).codeMap;


function geturl(name) {
  var reg = new RegExp('[^\?&]?' + encodeURI(name) + '=[^&]+')
  var arr = window.location.search.match(reg)
  if (arr != null) {
    return decodeURI(arr[0].substring(arr[0].search('=') + 1))
  }
  return ''
}

@config({
  path: '/nft_collection',
  ajax: true,
  noFrame: true,
  noAuth: true,
})

export default class nft_detail extends Component {
  state = {
    loading:false,
    data:[],
    listData:null,
    collData:[],
    pageNo:1,
    pageSize:8,
    total:0,
  };

  componentDidMount() {
    this.handleCollection()
    this.handleCollec(1)
  }
  handleCollection(){
    const id = localStorage.getItem('collectionId')
    this.setState({loading:true})
    this.props.ajax.post(`${CODEMAP.nft_mobile_collection_colletionDetail}?nftCollectionId=${id}`).then(res => {
      if (res.status == 'success' && res.statusCode == '200') {
        this.setState({listData:res.result})
      } else {
        message.error(res.message);
      }
    }).finally(() => this.setState({ loading: false }));
  }
  handleCollec(pageNo){
    const {pageSize } = this.state
    const params = {
      pageNo:pageNo,
      pageSize:pageSize
    }
    const id = localStorage.getItem('collectionId')
    this.setState({loading:true})
    this.props.ajax.post(`${CODEMAP.nft_mobile_collection_findWorksInCollection}?collectionId=${id}`,params).then(res => {
      if (res.status == 'success' && res.statusCode == '200') {
        this.setState({collData:res.result,total:res.page.totalCount})
      } else {
        message.error(res.message);
      }
    }).finally(() => this.setState({ loading: false }));
  }
  handleDelete = (id) =>{
    this.setState({loading:true})
    this.props.ajax.post(`${CODEMAP.nft_works_logicDel}?worksId=${id}`).then(res => {
      if (res.status == 'success' && res.statusCode == '200') {
        message.success(res.message)
        this.handleCollection()
      } else {
        message.error(res.message);
      }
    }).finally(() => this.setState({ loading: false }));
  }
  getWork(id){
    localStorage.setItem('worksId',id)
  }
  render() {
    const { data,collData,listData,total,pageNo,pageSize } = this.state
    return (
      <div styleName="collection">
        <div styleName='nav'>
          <Header />
        </div>
        <div styleName='banner'>
        <img alt="example" src={AJAX_PREFIXCONFIG + listData?.bannerPath} />
        </div>
        <div styleName='people'>
        <img alt="example" src={AJAX_PREFIXCONFIG + listData?.logoPath} />
        </div>
        <div styleName='content'>
          <h2>{listData?.name}</h2>
          <p styleName='author'>??????&nbsp;&nbsp;<span>{listData?.username}</span></p>
          <div styleName='desc'>
            <Row>
            <Col span={6}>
                <h3>{listData?.counts}</h3>
                <p>??????</p>
              </Col>
              <Col span={6}>
                <h3>{listData?.possessnum}</h3>
                <p>?????????</p>
              </Col>
              <Col span={6}>
                <h3>{listData?.lowPrice}</h3>
                <p>?????????</p>
              </Col>
              <Col span={6}>
                <h3>{listData?.tradesum}</h3>
                <p>????????????</p>
              </Col>
            </Row>
          </div>
          <div className="braft-output-content" dangerouslySetInnerHTML = {{ __html:decodeURIComponent(listData?.details) }}></div>
        </div>
        <div styleName='similar'>
          <Row gutter={30}>
          {collData.map(item=>
              <Col span={6}>
                  <Card
                    styleName='card'
                    hoverable
                    cover={<Link to={`${preRouter}/nft_detail`} onClick={()=>this.getWork(item.id)}>
                    <img style={{width:'100%',objectFit:'contain'}} alt="example" src={AJAX_PREFIXCONFIG + item.dataPath} /></Link>}
                    >
                    <Row>
                      <Col span={16}>
                        <p>{item.name}</p>
                        <h3>{item.id}</h3>
                      </Col>
                      <Col span={8} styleName='right'>
                        <p>??????</p>
                        <h3>{item.price}</h3>
                      </Col>
                    </Row>
                    <div style={{textAlign:'center',marginBottom:'15px'}}>
                    {item.state === 0 && item.userId === item.authorId ? 
                    <Space>
                      <Link to={{pathname:`${preRouter}/nft_creatNFT`,state:{worksId:item.id}}}>
                        <Button style={{borderRadius:'20px'}} type='primary'>??????</Button>
                      </Link>
                      <Popconfirm style={{position:'absolute'}} title='???????????????????????????' onConfirm={() => { this.handleDelete(item.id) }} okText="??????" cancelText="??????">
                        <Button type='danger' style={{borderRadius:'20px'}}>??????</Button>
                      </Popconfirm>
                    </Space>
                    : item.state === 1 && item.userId === item.authorId ? <Button style={{width:'50%',height:'30px',borderRadius:'20px'}} disabled>?????????</Button>
                    : item.state === 2 && item.userId === item.authorId ? <Button style={{width:'50%',height:'30px',borderRadius:'20px'}} disabled>?????????</Button>
                    : item.state === 3 && item.userId === item.authorId ? <Button style={{width:'50%',height:'30px',borderRadius:'20px'}} disabled>?????????</Button>
                    : item.state === 4 && item.userId === item.authorId ? <Button style={{width:'50%',height:'30px',borderRadius:'20px'}} disabled>?????????</Button>
                    : <Button type='primary' style={{width:'50%',height:'30px',borderRadius:'20px'}} disabled>???????????????</Button>}
                    </div>
                  </Card>
              </Col>
            )}
          </Row>
          <Pagination
            total={total}
            pageNum={pageNo}
            hideOnSinglePage={true}
            pageSize={pageSize}
            onPageNumChange={pageNo => {this.setState({pageNo:pageNo});this.handleCollec(pageNo)}}
            onPageSizeChange={pageSize => {
              this.setState({pageSize:pageSize})
            }}
        />
        </div>
        <div styleName='footer'>
          <Footer />
        </div>
      </div>
    )
  }
}