import React from 'react';
import { getDocList } from '../../services/todos';
import { Input, Select, Button, Icon } from 'antd';
import classNames from 'classnames';
const Option = Select.Option;
import ReactMarkdown from 'react-markdown';
import {fetchDoc,fetchJson} from '../../services/xFetch';


import MainLayout from '../../layouts/MainLayout/MainLayout';




const SearchInput = React.createClass({
  getInitialState() {
    return {
      list: [],
      name: '',
      url:"",
      focus: false,
      selectMd:function(){}
    };
  },
  handleChange(value) {

    getDocList().then(({ jsonResult }) => {

      let listData=[];
      if(value){

         listData = jsonResult.data.filter(item=>{
           return item.name.toLowerCase().indexOf(value.toLowerCase())>-1;
        });

      }else{
        listData = jsonResult.data;
      }

      this.setState({
        list: listData,

      });
    })

  },
  selectAct(value){
    this.setState({url:value})
//    this.setState({ value });
    this.props.selectMd(value);
  },
  handleSubmit() {
    if(this.state.url){
      this.props.selectMd(this.state.url);
    }else{
      alert("没有找到相关注解")
    }
  },

  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.name.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    const options = this.state.list.map(d => <Option key={d.url}>{d.name}</Option>);
    return (
      <div className="ant-search-input-wrapper" style={this.props.style}>
        <Input.Group className={searchCls}>
          <Select
            combobox
            value={this.state.name}
            placeholder={this.props.placeholder}
            notFoundContent=""
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSelect={this.selectAct}
            onChange={this.handleChange}
            onFocus={this.handleFocusBlur}
            onBlur={this.handleFocusBlur}
          >
            {options}
          </Select>
          <div className="ant-input-group-wrap">
            <Button className={btnCls} onClick={this.handleSubmit}>
              <Icon type="search" />
            </Button>
          </div>
        </Input.Group>
      </div>
    );
  },
});



const SearchAnno = React.createClass({
  getInitialState: function () {
    return {
      mdvalue: "",
      markcss:"markdown-body"
    };
  },
  selectAct(value){
    fetchDoc("/docs/spring/"+value).then(resp=>{

      this.setState({mdvalue:resp});
    })
  },
  render() {
    return (
      <MainLayout>
        <div>
        <SearchInput placeholder="input search text" selectMd={this.selectAct} style={{ width: 200 }} />
        <ReactMarkdown className={this.state.markcss} source={this.state.mdvalue} />
         </div>
      </MainLayout>
    );
  },
});

export default SearchAnno;
