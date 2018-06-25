import React, { Component } from "react";
import { Grid, Card, Message, Icon, Input } from "semantic-ui-react";
import CheckboxTree from "react-checkbox-tree";

import "semantic-ui-css/semantic.min.css";

import "react-checkbox-tree/lib/react-checkbox-tree.css";
import "font-awesome/css/font-awesome.min.css";
// import nodesData from "./labelsToNodes";
// import _ from "lodash";

const nodes = [
  {
    value: "mars",
    label: "Mars",
    children: [
      { value: "phobos", label: "Phobos" },
      { value: "deimos", label: "Deimos", children:[
        {
          value: "layer3-1",
          label: "layer3-1",
          children: [
            { value: "phobos-4-1", label: "phobos-4-1" },
            { value: "phobos-4-2", label: "phobos-4-2" }
          ]
        },
        {
          value: "Mars3-2",
          label: "Mars3-2"
        }
      ] }
    ]
  },
  {
    value: "qq2",
    label: "qq2",
    children: [
      { value: "photo2", label: "photo2" },
      { value: "demino2", label: "demino2", children:[
        {
          value: "layer3-1",
          label: "layer3-1",
          children: [
            { value: "phobos-4-1-2", label: "phobos-4-1-2" },
            { value: "phobos-4-2-2", label: "phobos-4-2-2" }
          ]
        },
        {
          value: "Mars3-2-2",
          label: "Mars3-2-2"
        }
      ] }
    ]
  }
];
const nodesData = nodes;

class App extends Component {
  constructor() {
    super();
    this.state = {
      checked: [],
      expanded: [],
      keyword: ""
    };
  }

  onSearchInputChange = (event, data) => {
    this.setState({ keyword: data.value });
  };

  keywordFilter = (nodes, keyword) => {
    const newNodes = [];
    for(let n of nodes){
      if(n.label.indexOf(keyword)!==-1){
        newNodes.push(n);
      }
    }
    return newNodes;
  };

  render() {
    console.log('rawNodes', nodesData);
    const searchedNodes = this.keywordFilter(nodesData, this.state.keyword);
    console.log('searchedNodes',searchedNodes);;
    return (
      <div
        style={{
          boxSizing: "border-box",
          border: "2px solid black",
          // padding: "10px",
          height: "95vh"
        }}
      >
        <Grid celled>
          <Grid.Row>
            
            <Grid.Column
              width={10}
              style={{
                height: "90vh",
                overflow: "auto"
              }}
            >
              <Input
                style={{ marginBottom: "20px" }}
                fluid
                icon="search"
                placeholder="Search demographic, phone usage, life journey, intrest..."
                iconPosition="left"
                onChange={this.onSearchInputChange}
              />

              <CheckboxTree
                nodes={searchedNodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => {
                  console.log("checked", checked);
                  this.setState({ checked }, () => {
                    console.log("this.state", this.state);
                  });
                }}
                onExpand={expanded => this.setState({ expanded })}
                expandOnClick
                onClick={() => {
                  console.log("on click");
                }}
                showNodeIcon={false}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
