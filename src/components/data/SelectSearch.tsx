/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { If, F as div, F, Js } from '../misc';

export interface SelectSearchFetchOptions {
  page: number,
  perPage?: number,
  query?: string
}
export interface SelectSearchFetchResult {
  options: Option[],
  search: Required<SelectSearchFetchOptions>&{ pages: number, total: number }
}
export interface Option { name?: string, value: string }
interface Props {
  fetch?(options: SelectSearchFetchOptions): Promise<SelectSearchFetchResult>
  multiple?: boolean
  defaultOption?: Option
  options?: Option[]
  search?: SearchOptions
  onSelect(options: Option[]): any

}
interface SearchOptions extends Partial<SelectSearchFetchOptions>{
  placeholder?: string
  autoApply?: boolean
  // onSearch?(options: FetchOptions&{}):any
}

interface State {
  // options?: Option[]
  results? : SelectSearchFetchResult
}

export class SelectSearch extends React.Component<Props, State> {

  constructor(p: Props, s: State) {
    super(p, s)
    this.state = {}
    // if(!this.props.options|| !this.props.options.length){
    //   this.search()
    // }
  }

  async componentWillMount(){
    if(this.props.options && this.props.options.length){
      return
    }
    else {
      await this.search()
    }
  }

  public render() {
    return <div>
      <If<SearchOptions> c={this.props.search}>{options =>
        <div className="search-options">
          <input type="text" placeholder={options.placeholder || ''} defaultValue={options.query || ''}></input>
          <If c={options.autoApply}>{() =>
            <button onClick={e => {
              this.search()
            }}>Search</button>
          }</If>
        </div>
      }</If>

      <select onChange={e=>{
        const selected = Array.from(e.currentTarget.selectedOptions).map(e=>e.value)
        const selectedOptions = (this.props.options||[]).filter(o=>selected.includes(o.value))
        this.props.onSelect(selectedOptions)
      }}>
        <If<Option> c={this.props.defaultOption}>{option =>
          <option value={option.value}>{option.name || option.value}</option>
        }</If>
        {/* <Js>{()=>console.log(this.state.results && this.state.results.options)       }</Js> */}
        <If<Option[]> c={this.state.results && this.state.results.options || this.props.options}>{options => <F>{options.map(option =>
          <option key={option.value} value={option.value}>{option.name || option.value}</option>
        )}
        </F>}</If>
      </select>
    </div>
  }

  protected async search() {
    if(!this.props.fetch){
      return
    }
    const results = await this.props.fetch({...this.props.search||{}, page: this.props.search && this.props.search.page|| 0, })

    this.setState({results})
  }
}
