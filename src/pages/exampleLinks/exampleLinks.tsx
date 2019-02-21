/** @jsx */
import * as React from 'react';
// import { ClearAllFilters } from '../../components/data/react-bootstrap-table-next/experiments/react-bootstrap-table-next-clearallfilters';
import { Link } from '../../components/misc';
import { fetchJson } from '../../utils/callApi';
// import { RemoteAllTestContainer } from '../../experiments/react-bootstrap-table-next-remote-all';


// import { safeEval } from '../../utils/safeEval';
// const Evaluator = (props: {}) => <div>
//   <textarea id="code">{`
// ({
//   a: alert('hacker msg') || 'alert not shown',
//   b: 2
// })
//  `.trim()}
//   </textarea>
//   <button onClick={async e => {
//     const code = document.querySelector<HTMLTextAreaElement>('#code')!.value
//     const { result, error } = await safeEval<any>(code)
//     console.log(`safe eval result:`, result, 'error:', error)
//   }}>eval</button>
// </div>

// (async () => {
//   const { result, error } = await safeEval<number>(`Math.random()*Math.random()`)
//   console.log(`safe eval result: `, result, 'error: ', error)

//   // alternatively instead promises you can also use callback functions
//   safeEval<any>((`Math.random()*Math.random()`),
//     ({ result, error }) => console.log(`safe eval result: `, result, 'error: ', error))
// })()

export class ExampleLinks extends React.Component<{}, {}> {
  render() {

    return <div>

      <h1>Example links</h1>
      <button onClick={async e=>{
        const r = await fetchJson('get', 'https://api.worldbank.org/v2/country/br?format=json')
        console.log(r);
      }}>click</button>

<button onClick={async e=>{
        const r = await fetchJson('get', 'http://climatedataapi.worldbank.org/climateweb/rest/v1/country/mavg/bccr_bcm2_0/pr/1980/1999/bra')
        console.log(r);
      }}>climate</button>


      <ul>
        <li>
          <Link to={`/recordView/commercecategory/2/{"seeValues"%3Atrue%2C"showSublistLines"%3Atrue}`}>
            /recordView/commercecategory/2/{'{'}"seeValues"%3Atrue%2C"showSublistLines"%3Atrue{'}'} (escaped JSON options)
          </Link>
        </li>
        <li>
          <Link to={`/recordView/commercecategory/2/{showSublistLines:true,seeValues:true}`}>
            /recordView/commercecategory/2/{'{'}showSublistLines:true,seeValues:true{'}'} (unescaped - non JSON options)
          </Link><br></br>
          <Link to={`/recordView/commercecategory/2/{showSublistLines:true,seeValues:true}`}>
            /recordView/commercecategory/2/{'{'}showSublistLines:true,seeValues:true{'}'} (unescaped - non JSON options)
          </Link><br></br>


          <a href={`${location.pathname}${location.search}#/recordView/commercecategory/2/{showSublistLines:true,seeValues:true}`}>clickckck</a>
        </li>

        <li>
          <Link to={`/recordView/inventoryitem/465/{}`}>
            /recordView/item/2235/{'{}'}
          </Link>
        </li>


        <li>
          <Link  to={`/countryIndicator/{type:"item",userColumns:["baseprice","created","displayname","itemid","onlineprice","parent","type"],pageSize:38}`}>
  /countryIndicator/{'{'}type:"item",userColumns:["baseprice","created","displayname","itemid","onlineprice","parent","type"],pageSize:38}
          </Link>
        </li>
        <li>
          <Link to={`/countryIndicator/{"type"%3A"item"%2C"userColumns"%3A["baseprice"%2C"created"%2C"displayname"%2C"itemid"%2C"onlineprice"%2C"parent"%2C"type"]%2C"pageSize"%3A38}`}>
  /countryIndicator/{'{'}"type"%3A"item"%2C"userColumns"%3A["baseprice"%2C"created"%2C"displayname"%2C"itemid"%2C"onlineprice"%2C"parent"%2C"type"]%2C"pageSize"%3A38}
          </Link>
        </li>


      </ul>

    </div>
  }
}
