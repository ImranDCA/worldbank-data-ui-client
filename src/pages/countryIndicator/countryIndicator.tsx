/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { ErrorComponent } from '../../components/data/errorComponent';
import { Loading } from '../../components/data/Loading';
import { SearchResults } from '../../components/data/searchResults/searchResults';
import { Container } from '../../components/layout/Container';
import { Page } from '../../components/layout/Page';
import { If, NoWrap, Count } from '../../components/misc';
import { OptionsUrlComponent } from '../../components/optionsUrlComponent';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import { ErrorOptions, ResultPagination, PaginationOptions, Result, Country } from '../../store/commonTypes';
import { FetchCountryOptions as FetchCountriesOptions, CountryResult, IndicatorResult, SourceResult, FetchSourceOptions as FetchSourcesOptions } from '../../store/countryIndicator';
import { fetchCountries, fetchSources } from '../../store/countryIndicator/actions';
import { ToolBox } from '../../components/toolBox';

interface PropsFromState {
  loading?: boolean
  source?: string
  sourceResults?: SourceResult
  country?: string
  countryResults?: CountryResult
  indicator?: string
  indicatorResults?: IndicatorResult
  error?: ErrorOptions
}

interface PropsFromDispatch {
  fetchCountries: typeof fetchCountries
  fetchSources: typeof fetchSources
}

interface RouteParams {
  options?: string
}

interface State extends Partial<PaginationOptions> {
  country?: string
  indicator?: string
  source?: string
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

  async componentWillMount(){
    await super.componentWillMount()
    if(!this.props.countryResults) {
      await this.executeActionForNewOptions(this.state)
    }
  }
  protected async executeActionForNewOptions(newOptions: State) {
    if (!this.props.sourceResults) {
      this.props.fetchSources({
        ...newOptions,
        per_page: newOptions.per_page || this.state.per_page || 50,
        page: newOptions.page || this.state.page || 1,
      })
    }
    if (!this.props.countryResults) {
      this.props.fetchCountries({
        ...newOptions,
        per_page: newOptions.per_page || this.state.per_page || 50,
        page: newOptions.page || this.state.page || 1,
      })
    }
    // else if(this.props.country){
    //   debugger
    // }
  }

  getRouteOptionNames(): string[] {
    return ['country', 'indicator', 'source', 'per_page', 'page', 'dontAutoApply']
  }

  public render() {

    return <Page>
      <Container className="list-record-types">
        <ToolBox>
          <ul>
            <li>
              <NoWrap><label className="seeValues">
                <input type="checkbox" checked={!this.state.dontAutoApply}
                  onChange={e => this.setState({ dontAutoApply: !e.currentTarget.checked })}></input>
                Auto Apply?
                    </label>
              </NoWrap>
            </li>
          </ul>
        </ToolBox>

        <If<CountryResult> c={this.props.sourceResults}>{sourceResults => {
        const sources = sourceResults[1]
        return <div css={css`& h4 {display: inline; margin-left: 1em}`}>
          <h4>Sources <Count>{sources.length}</Count>: </h4>
          <select className="select-type" value={this.state.source || ''}
            onChange={async e => {
              const source = e.currentTarget.selectedOptions[0].value
              if (source) {
                this.setState({ source })
              }
            }}>
            <option value="">Select a source</option>
            {sources.map(r =>
              <option value={r.id} key={r.id}>{r.name}</option>
            )}
          </select>
        </div>}}</If>

        <If<CountryResult> c={this.props.countryResults}>{countryResults => {
        const countries = countryResults[1]
        return <div css={css`& h4 {display: inline; margin-left: 1em}`}>
          <h4>Countries <Count>{countries.length}</Count>: </h4>
          <select className="select-type" value={this.state.country || ''}
            onChange={async e => {
              const country = e.currentTarget.selectedOptions[0].value
              if (country) {
                this.setState({ country })
              }
            }}>
            <option value="">Select a Country</option>
            {countries.map(r =>
              <option value={r.id} key={r.id}>{r.name}</option>
            )}
          </select>
        </div>}}</If>

        <If<IndicatorResult> c={this.props.indicatorResults} >{indicatorResults => {
          const indicators = indicatorResults[1]
        return <div css={css`& h4 {display: inline; margin-left: 1em}`}>
          <h4>Indicators. <Count>{indicators.length}</Count>: </h4>
          <select className="select-type" value={this.state.country || ''}
            onChange={async e => {
              const indicator = e.currentTarget.selectedOptions[0].value
              if (indicator) {
                this.setState({ indicator })
              }
            }}>
            <option value="">Select a Country</option>
            {indicators.map(r =>
              <option value={r.id} key={r.id}>{r.name}</option>
            )}
          </select>
        </div>}}</If>


        {/* <If<SearchColumn[]> c={this.state.type && columns}>{columns =>

          <div>
            <h4>Columns <Count>{columns.length}</Count>: </h4>
            <ColumnSelect id="columns-select" multiple={true} defaultValue={this.state.userColumns}
              onChange={e => {
                if (this.state.dontAutoApply) {
                  return
                }
                this.updateStateWithUI();
              }}>
              <option>Select a Column</option>
              {columns.map(c =>
                <option value={c.id} key={c.id}>{c.id} ({c.label})</option>)
              }
            </ColumnSelect>
          </div>}</If> */}

          <div>
              <label>Page Size:
                    <input type="number" id="page-size-input" defaultValue={this.state.per_page + ''}
                  onChange={async e => {
                    if (this.state.dontAutoApply) {
                      return
                    }
                    this.setState({ ...this.state, per_page: e.currentTarget.valueAsNumber })
                  }}>
                </input>
              </label>
            </div>

          <If c={this.state.dontAutoApply}>{() =>
              <button onClick={e => {
                this.updateStateWithUI()
              }}>Apply</button>
            }</If>

        <If c={!this.props.error}>{() =>
          <Loading {...this.props}>

            {/* <If<CountryResult[]> c={this.props.countryResults}>{results => {
              // const formattedResults = results.map(r => {
              //   const resultColumns = this.props.resultColumns || this.state.userColumns
              //   if (!resultColumns || !this.state.userColumns) {
              //     return r
              //   }
              //   r.columns.forEach((s, i) => {
              //     const name = resultColumns[i]
              //     if (name) {
              //       r[name] = s
              //     }
              //   })
              //   return { ...r, columns: undefined }
              // })
              // return <SearchResults {...this.props} type={country!}
              //   userColumns={this.state.userColumns!}
              //   results={formattedResults} columns={columns!} />
              return <div>countries {results.length}</div>
            }}</If> */}
          </Loading>
        }</If>
        <If<ErrorOptions> c={this.props.error}>{error =>
          <ErrorComponent {...error} />
        }</If>
      </Container>
    </Page >

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
  country: countryIndicator.country,
  countryResults: countryIndicator.countryResults,
  indicator: countryIndicator.indicator,
  indicatorResults: countryIndicator.indicatorResults,
  source: countryIndicator.source,
  sourceResults: countryIndicator.sourceResults,
  loading: countryIndicator.loading,
  // recordTypes: countryIndicator.recordTypes,
  error: countryIndicator.error,
  // resultColumns: countryIndicator.resultColumns
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCountries: (options: FetchCountriesOptions) => dispatch(fetchCountries(options)),
  fetchSources: (options: FetchSourcesOptions) => dispatch(fetchSources(options))
})

export const CountryIndicator = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryIndicatorIndexPage))
