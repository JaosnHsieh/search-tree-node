import React, { Component } from "react";
import { Grid, Card, Message, Icon, Input } from "semantic-ui-react";
import CheckboxTree from "react-checkbox-tree";

import "semantic-ui-css/semantic.min.css";

import "react-checkbox-tree/lib/react-checkbox-tree.css";
import "font-awesome/css/font-awesome.min.css";
import nodesData from "./labelsToNodes";
// import _ from "lodash";

// const nodes = [
//   {
//     value: "1-1",
//     children: [
//       { value: "1-1-1"},
//       { value: "1-1-2", children:[
//         {
//           value: "1-1-2-1",
//           children: [
//             { value: "1-1-2-1-1" },
//             { value: "1-1-2-1-2" }
//           ]
//         },
//         {
//           value: "1-1-2-2"
//         }
//       ] }
//     ]
//   },
//   {
//     value: "1-2",
//     children: [
//       { value: "1-2-1"},
//       { value: "1-2-2", children:[
//         {
//           value: "1-2-2-1",
//           children: [
//             { value: "1-2-2-1-1" },
//             { value: "1-2-2-1-2" }
//           ]
//         },
//         {
//           value: "1-2-2-2"
//         }
//       ] }
//     ]
//   },
// ];
// const nodesData = nodes;

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
      if(n.children){
          const next = this.keywordFilter(n.children,keyword);
        if(next.length > 0){
            n.children = next;
            newNodes.push(n);
            continue;            
        };
        if(n.label.includes(keyword)){
            n.children = [];
            newNodes.push(n);
            continue;
        }
        
        // console.log('n.label', n.value);
      }else{
          if(n.label.includes(keyword)){
            // console.log('#n.label', n.value);
            newNodes.push(n);
        }

      }
      
    }
    // console.log('newNodes',newNodes);
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
