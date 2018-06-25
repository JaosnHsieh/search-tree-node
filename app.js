const nodes = [
    {
      value: "1-1",
      children: [
        { value: "1-1-1"},
        { value: "1-1-2", children:[
          {
            value: "1-1-2-1",
            children: [
              { value: "1-1-2-1-1" },
              { value: "1-1-2-1-2" }
            ]
          },
          {
            value: "1-1-2-2"
          }
        ] }
      ]
    },
    {
      value: "1-2",
      children: [
        { value: "1-2-1"},
        { value: "1-2-2", children:[
          {
            value: "1-2-2-1",
            children: [
              { value: "1-2-2-1-1" },
              { value: "1-2-2-1-2" }
            ]
          },
          {
            value: "1-2-2-2"
          }
        ] }
      ]
    },
  ];



  const keywordFilter = (nodes, keyword) => {
    //   console.log('keyword',keyword);
    // console.log('nodes', JSON.stringify(nodes,0,4));
    const newNodes = [];
    for(let n of nodes){
      if(n.children){
          const next = keywordFilter(n.children,keyword);
        if(next.length > 0){
            n.children = next;
            newNodes.push(n);
            continue;            
        };
        if(n.value.includes(keyword)){
            n.children = [];
            newNodes.push(n);
            continue;
        }
        
        // console.log('n.label', n.value);
      }else{
          if(n.value.includes(keyword)){
            // console.log('#n.label', n.value);
            newNodes.push(n);
        }

      }
      
    }
    // console.log('newNodes',newNodes);
    return newNodes;
  };

const n =  keywordFilter(nodes, "1-2-2-2");
console.log('n', JSON.stringify(n,0,4));
//  console.log('123'.includes("1"));