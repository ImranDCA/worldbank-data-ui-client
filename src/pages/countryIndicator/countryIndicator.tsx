/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { Dispatch } from 'redux'
import { ErrorComponent } from '../../components/data/errorComponent'
import { Loading } from '../../components/data/Loading'
import { SearchResults } from '../../components/data/searchResults/searchResults'
import { Container } from '../../components/layout/Container'
import { Page } from '../../components/layout/Page'
import { If, NoWrap, Count } from '../../components/misc'
import { OptionsUrlComponent } from '../../components/optionsUrlComponent'
import { ApplicationState, ConnectedReduxProps } from '../../store'
import { ErrorOptions, ResultPagination, PaginationOptions, Result, Country, ValuedResult } from '../../store/commonTypes'
import {
  FetchCountryOptions,
  CountryResult,
  IndicatorResult,
  SourceResult,
  FetchSourceOptions,
  FetchIndicatorsOptions,
  FetchSearchOptions,
  SearchResult
} from '../../store/countryIndicator'
import { fetchCountries, fetchSources, fetchIndicators, fetchSearch } from '../../store/countryIndicator/actions'
import { ToolBox } from '../../components/toolBox'
import { SelectSearch } from '../../components/data/SelectSearch'
import { styled } from '../../styles/theme'
import { minWidth } from '../../styles/media';
import { DataTable } from '../../components/data/DataTable';

interface PropsFromState {
  loading?: boolean
  countries?: string[]
  indicators?: string[]
  sources?: string[]
  sourceResults?: SourceResult
  countryResults?: CountryResult
  indicatorResults?: IndicatorResult
  searchResults?: SearchResult
  error?: ErrorOptions
}

interface PropsFromDispatch {
  fetchCountries: typeof fetchCountries
  fetchSources: typeof fetchSources
  fetchIndicators: typeof fetchIndicators
  fetchSearch: typeof fetchSearch
}

interface RouteParams {
  options?: string
}

interface State extends Partial<PaginationOptions> {
  countries?: string[]
  indicators?: string[]
  sources?: string[]
  dontAutoApply?: boolean
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps & RouteComponentProps<RouteParams>

class CountryIndicatorIndexPage extends OptionsUrlComponent<AllProps, State, State> {
  constructor(p: AllProps, s: State) {
    super(p, s)
    this.state = {
      // HEADS UP: dont init the state so it gets updated with route options
    }
  }

  async componentWillMount() {
    await super.componentWillMount()
    // if (!this.props.countryResults || ) {
      await this.executeActionForNewOptions(this.state)
    // }
  }
  protected async executeActionForNewOptions(newOptions: State) {
    const options = {
      // ...this.state,
      ...newOptions,
      per_page: newOptions.per_page || this.state.per_page || 50,
      page: newOptions.page || this.state.page || 1
    }
    if (!this.props.sourceResults) {
      this.props.fetchSources(options)
    }
    else if(options.sources && options.sources.length) {
      if (!this.props.countryResults) {
        this.props.fetchCountries({...options, source: options.sources[0]})
      }
      if (!this.props.indicatorResults) {
        this.props.fetchIndicators({...options, source: options.sources[0]})
      }
    }
    if(this.state.sources && this.state.sources.length&&this.state.countries && this.state.countries.length&&this.state.indicators && this.state.indicators.length){
      const allOptions = {...this.state, ...options}
      // we assume we must show results
      // debugger
        this.props.fetchSearch({...allOptions as any, source: allOptions.sources![0] })
    }
  }

  getRouteOptionNames(): string[] {
    return ['countries', 'indicators', 'sources', 'per_page', 'page', 'dontAutoApply']
  }

  public render() {
    return (
      <Page>
        <GridContainer className="country-indicator">
          <ToolBox>
            <ul>
              <li>
                <NoWrap>
                  <label className="seeValues">
                    <input
                      type="checkbox"
                      checked={!this.state.dontAutoApply}
                      onChange={e => this.setState({ dontAutoApply: !e.currentTarget.checked })}
                    />
                    Auto Apply?
                  </label>
                </NoWrap>
              </li>
            </ul>
          </ToolBox>

          <If<CountryResult> c={this.props.sourceResults}>
            {sourceResults => {
              const sources = sourceResults[1]
              return (
                <SelectContainer className="select-sources">
                  <h4>
                    Sources <Count>{`${(sourceResults as any).total>sources.length && sources.length} / ${(sourceResults as any).total}`}</Count>:
                  </h4>
                  <SelectSearch
                    selected={this.state.sources}
                    defaultOption={{name: 'Select a Source', value: ''}}
                    onSelect={async sources => {
                      const source = sources.find(i => i.value!=='')
                      if(source){
                        this.setState({ sources:[source.value]  })
                      }
                    }}
                    options={sources.map(c => ({ value: c.id, name: c.name }))}
                  />
                </SelectContainer>
              )
            }}
          </If>

          <If<CountryResult> c={this.props.countryResults}>
            {countryResults => {
              const countries: ValuedResult[] = this.getValuesFromResponse(countryResults)
              return (
                <SelectContainer className="select-countries">
                  <h4>
                    Countries <Count>{`${(countryResults as any).total>countries.length && countries.length} / ${(countryResults as any).total}`}</Count>:
                  </h4>
                  <SelectSearch
                    selected={this.state.countries}
                    multiple={true}
                    onSelect={async countries => {
                      if(countries.filter(c=>c.value).length){
                        this.setState({ countries: countries.map(i => i.value) })
                      }
                    }}
                    options={countries.map(c => ({ value: c.id, name: c.value }))}
                  />
                </SelectContainer>
              )
            }}
          </If>

          <If<IndicatorResult> c={this.props.indicatorResults}>
            {indicatorResults => {
              const indicators: ValuedResult[] = this.getValuesFromResponse(indicatorResults)
              return (
                <SelectContainer className="select-indicators">
                  <h4>
                    Indicators <Count>{`${(indicatorResults as any).total>indicators.length && indicators.length} / ${(indicatorResults as any).total}`}</Count>:
                  </h4>
                  <SelectSearch
                    multiple={true}
                    selected={this.state.indicators}
                    onSelect={async indicators => {
                      if(indicators.filter(c=>c.value).length){
                      this.setState({ indicators: indicators.map(i => i.value) })
                      }
                    }}
                    options={indicators.map(c => ({ value: c.id, name: c.value }))}
                  >
                  </SelectSearch>
                </SelectContainer>
              )
            }}
          </If>

          {/* <div>
            <label>
              Page Size:
              <input
                type="number"
                id="page-size-input"
                defaultValue={this.state.per_page + ''}
                onChange={async e => {
                  if (this.state.dontAutoApply) {
                    return
                  }
                  this.setState({ ...this.state, per_page: e.currentTarget.valueAsNumber })
                }}
              />
            </label>
          </div> */}

          <If c={this.state.dontAutoApply}>
            {() => (
              <button
                onClick={e => {
                  this.updateStateWithUI()
                }}
              >
                Apply
              </button>
            )}
          </If>

          <If c={!this.props.error}>
            {() => (
              <Loading {...this.props}>
                <If<SearchResult> c={this.props.searchResults}>{result => {
             return      <DataTable columns={['country', 'indicator', 'value']}>
                  {result.result.map(r=><tr><td>{r.variable.find(v=>v.concept.toLowerCase()==='country')!.value}</td><td>{r.variable.find(v=>v.concept.toLowerCase()==='series')!.value}</td> <td>{r.value}</td></tr>)}
                  </DataTable>

            }}</If>
            <If c={!this.props.searchResults}>{()=><div>EMPTY RESULTS</div>}</If>
              </Loading>
            )}
          </If>
          <If<ErrorOptions> c={this.props.error}>{error => <ErrorComponent {...error} />}</If>
        </GridContainer>
      </Page>
    )
  }

  private getValuesFromResponse(response: any): ValuedResult[] {
    return response.source[0].concept[0].variable//.map(c => ({ value: c.id, name: c.value }));
  }

  private updateStateWithUI() {
    // const select = document.querySelector<HTMLSelectElement>('#columns-select')!
    // const selected = select.selectedOptions.length ? Array.from(select.selectedOptions).map(o => o.value) : [];
    let s: State = {}
    // if (selected.length) {
    //   s.userColumns = selected
    // }
    s.per_page = document.querySelector<HTMLInputElement>('#page-size-input')!.valueAsNumber
    this.setState(s)
  }
}

// const ColumnSelect = styled.select`
//   resize: both;
// `

const mapStateToProps = ({ countryIndicator }: ApplicationState): PropsFromState => ({
  countries: countryIndicator.countries,
  countryResults: countryIndicator.countryResults,
  indicators: countryIndicator.indicators,
  indicatorResults: countryIndicator.indicatorResults,
  sources: countryIndicator.sources,
  sourceResults: countryIndicator.sourceResults,
  searchResults: countryIndicator.searchResults,
  loading: countryIndicator.loading,
  // recordTypes: countryIndicator.recordTypes,
  error: countryIndicator.error
  // resultColumns: countryIndicator.resultColumns
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCountries: (options: FetchCountryOptions) => dispatch(fetchCountries(options)),
  fetchSources: (options: FetchSourceOptions) => dispatch(fetchSources(options)),
  fetchIndicators: (options: FetchIndicatorsOptions) => dispatch(fetchIndicators(options)),
  fetchSearch: (options: FetchSearchOptions) => dispatch(fetchSearch(options))
})

const SelectContainer = styled.div`
& h4 {
  display: inline;
  margin-left: 1em;
}
& select {
  resize: both;
}
`

const GridContainer = styled(Container)`

`

// ${props=>minWidth(props).md`
// display: grid;
// grid-template-columns: repeat(3, 1fr);
// grid-gap: 10px;
// grid-auto-rows: minmax(100px, auto);
// .select-countries {
//   grid-column: 1 / 3;
// }
// .select-sources {
//   grid-column: 2 / 3;
// }
// .select-indicators {
//   grid-column: 3 / 3;
// }
// `}

export const CountryIndicator = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CountryIndicatorIndexPage)
)
