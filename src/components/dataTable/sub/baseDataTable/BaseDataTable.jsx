/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState, useEffect, useCallback, useRef, useMemo
} from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Pagination from '@mui/material/Pagination'
import {
  useTable,
  useFlexLayout,
  useSortBy,
  useFilters,
  usePagination,
  useExpanded
} from 'react-table'
import CustomScroll from 'react-custom-scroll'
import { alpha } from '@mui/material/styles'
import Icon from '@mdi/react'
import { styled } from '@mui/system'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { mdiSort, mdiSortDescending, mdiSortAscending } from '@mdi/js'
import clsx from 'clsx'
import { v4 as uuid } from 'uuid'
import TextColumnFilter from '../filters/textColumnFilter'
import filterTypes from '../filters/filterTypes'
import styles from './baseDataTable.module.sass'
import '../css/customScroll.css'
import '../css/customScrollBar.css'

const StyledTh = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}))

const StyledTr = styled('div')(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.2),
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.5),
  },
}))

const StyledSortIcon = styled('div')(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  '&.sorted': {
    backgroundColor: alpha(theme.palette.primary.main, 0.6),
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}))

const isEmptyHeader = headers => !headers.some(cur => cur.Header)

function DataTable({
  columns, // 資料列設定
  data, // 外部資料 (serverSide 為 false 時使用)
  serverSide, // 資料來源是否是透過 serverSide
  ajax, // serverSide 時要送 query 用的設定 (serverSide 為 true 時使用)
  preprocess, // 預處理 ajax 傳回來的資料
  tbodyMaxHeight, // table 最大高度
  tbodyMinHeight, // table 最小高度
  tbodyFixHeight, // table 固定高度
  disableFilters, // 關閉所有篩選功能
  disableSortBy, // 關閉所有排序功能
  pageSizeList, // 每頁顯示資料筆數的選單選項列表
  defaultPageSizeIndex, // 預設要使用每頁顯示資料筆數選單選項列表的第幾個數值
  defaultSortBy, // 預設排序設定
  defaultFetchData, // 是否要在初始化時便抓取資料 (serverSide 為 true 時使用)
  renderSubRow, // 如果有 subRow, 用來渲染 subRow的方法
  axs, // axios instance, serverSide 要求資料時使用的 axios 實例
  rowProps, // 對 row 作客製化的設定
  enableFooter, // 開啟 footer 列
  enablePagination, // 開啟 pagination 列
  enableSubRow, // 開啟 subRow 模式(前方自動產生箭頭)
  offsetTotal, // 計算 total 數量的時候可以依據使用情境作加減顯示
  enableOuterScroll, // 默認 false。滾動內容時阻止外部滾動
  getFilters, // 取得所有的 filters
  getServerSideData, // 取得 server side 的 data
}) {
  const [dataRegister, setDataRegister] = useState([]) // serverSide 用的資料暫存區
  const [totalPages, setTotalPages] = useState(-1) // 總頁數
  const [total, setTotal] = useState(0) // 資料總筆數
  const [isLoading, setIsLoading] = useState(false) // 開啟 loading 遮罩
  const [curPageSizeValue, setCurPageSizeValue] = useState(
    pageSizeList[defaultPageSizeIndex] || pageSizeList[0]
  )
  const refDefaultSortBy = useRef(defaultSortBy)
  const dataTableBodyRef = useRef(null)
  const isMounted = useRef(false)

  // 展開按鈕
  const columnsSettings = useMemo(() => (enableSubRow ? [{
    id: 'expander',
    Header: '',
    // eslint-disable-next-line react/prop-types
    Cell: ({ row }) => (
      <div
        className={styles.expander}
        // eslint-disable-next-line react/prop-types
        {...row.getToggleRowExpandedProps()}
        title={('Expand')}
      >
        <span>
          {
          // eslint-disable-next-line react/prop-types
            row.isExpanded ? <ArrowDropDownIcon /> : <ArrowRightIcon />
          }
        </span>
      </div>
    ),
    width: 10,
    align: 'center',
  },
  ...columns]
    : columns
  ), [columns, enableSubRow])

  const curPageSize = useMemo(() => {
    if (curPageSizeValue === -1) {
      if (serverSide) {
        return curPageSizeValue
      }
      return data.length || 1 // cannot be zero
    }
    return curPageSizeValue
  }, [curPageSizeValue, data, serverSide])

  // 每個 column 的預設設定(若要啟用 filter 功能需預設提供 Filter)
  const defaultColumn = useMemo(() => ({
    minWidth: 0,
    width: 50,
    maxWidth: 1000,
    Filter: TextColumnFilter, // 預設以字串方式搜尋
  }), [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    prepareRow,
    page,
    setPageSize,
    setAllFilters,
    setSortBy,
    state: {
      pageIndex, pageSize, sortBy, filters,
    },
    gotoPage,
    pageCount,
  } = useTable(
    {
      columns: columnsSettings,
      disableFilters,
      data: serverSide ? dataRegister : data,
      autoResetSortBy: false,
      manualSortBy: serverSide,
      disableSortRemove: true,
      manualFilters: serverSide,
      autoResetPage: false,
      manualPagination: serverSide,
      defaultColumn,
      initialState: {
        pageIndex: 0,
        pageSize: curPageSize,
        sortBy: defaultSortBy,
        filters: [],
      },
      pageCount: totalPages,
      filterTypes,
    },
    useFlexLayout,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  )

  const scrollToTop = useCallback(() => {
    dataTableBodyRef.current.scrollTop = 0
  }, [])

  // 當前頁碼從第幾筆資料開始顯示
  const showMin = useMemo(() => {
    if (total > 0) {
      if (pageSize === -1) {
        return 0
      }
      return pageSize * pageIndex + 1
    }
    return 0
  }, [total, pageSize, pageIndex])

  // 當前頁碼顯示到第幾筆資料
  const showMax = useMemo(
    () => {
      if (total > 0) {
        if (pageSize === -1) {
          return total
        }
        return Math.min((pageSize * (pageIndex + 1)), total)
      }
      return 0
    },
    [total, pageSize, pageIndex]
  )

  // server side 抓取資料
  /**
   * @param {object} queryParams
   * @param {number} queryPageIndex 抓第幾頁的資料
   * @param {number} queryPageSize 一頁抓幾筆
   * @param {array} querySortBy 預設的排列方式
   * eg. [{id:<要作為排序依據的column id>, desc: <是否倒序>}, ...]
   * @param {array} queryFilterBy 預設的篩選方式
   */
  const fetchData = useCallback(async (
    queryParams,
    queryPageIndex,
    queryPageSize,
    querySortBy,
    queryFilterBy
  ) => {
    const sendData = {
      where: queryParams,
      offset: queryPageSize === -1 ? 0 : queryPageSize * queryPageIndex,
      limit: queryPageSize === -1 ? 99999 : queryPageSize,
      order: {},
    }

    // 如果有設定預設排列方式
    // (前端套件可支援多條件排序, 但後端目前僅做單一條件排序, 故此處僅帶第一條件)
    if (querySortBy.length > 0) {
      sendData.order[querySortBy[0].id] = querySortBy[0].desc ? 'DESC' : 'ASC'
    }

    // 如果有設定預設篩選方式
    // 依序將條件 assign 疊加起來
    if (queryFilterBy && queryFilterBy.length > 0) {
      sendData.where = Object.assign(
        {},
        sendData.where,
        ...queryFilterBy.map(ft => ({ [ft.id]: ft.value }))
      )
    }

    setIsLoading(true)

    try {
      const rs = await axs(ajax.url, sendData)
      const totalNumOfPages = Math.ceil(rs.recordsTotal / queryPageSize)
      setPageSize(queryPageSize)
      setTotalPages(totalNumOfPages)
      setTotal(rs.recordsTotal)

      if (getServerSideData) {
        getServerSideData(rs?.data || [])
      }

      // 倘若需要對各 column 資料做預處理
      if (preprocess && typeof preprocess === 'function') {
        const preProcessedData = rs?.data?.map(curRow => preprocess(curRow))
        setDataRegister(preProcessedData || [])
        return preProcessedData
      }
      setDataRegister(rs.data || [])
      return rs.data
    } catch (err) {
      setDataRegister([])
      return err
    } finally {
      scrollToTop()
      setIsLoading(false)
    }
  }, [axs, ajax.url, setPageSize, preprocess, scrollToTop, getServerSideData])

  const isSubmitSearch = useRef(false)
  const isPageChangeByManual = useRef(false)
  const isSortChangeByManual = useRef(false)
  const isSortChangeBySubmit = useRef(false)
  const isFilterChangeByManual = useRef(false)
  const isFilterChangeBySubmit = useRef(false)

  // 切換當前頁碼
  const handlePageChange = useCallback((event, selectedPage) => {
    gotoPage(selectedPage - 1)
    isPageChangeByManual.current = true
  }, [gotoPage])

  // 切換當前頁面顯示資料筆數
  const handlePageSizeChange = useCallback((event) => {
    gotoPage(0)

    const newPageSize = Number(event.target.value)
    setCurPageSizeValue(newPageSize)
    isPageChangeByManual.current = true
  }, [gotoPage])

  useEffect(() => {
    if (curPageSizeValue === -1) {
      setPageSize(serverSide ? -1 : (data.length || 1))
    } else {
      setPageSize(Number(curPageSizeValue))
    }
  }, [curPageSizeValue, data, dataRegister, serverSide, setPageSize])

  // 使用者手動送出查詢
  useEffect(() => {
    // user submit request
    if (isMounted.current && ajax?.url) {
      isSubmitSearch.current = true
      gotoPage(0)
      // 標記這次的 filter 條件變更是因為查詢時手動重置
      isFilterChangeBySubmit.current = true
      setAllFilters([])
      // 標記這次的 sort 條件變更是因為查詢時手動重置
      isSortChangeBySubmit.current = true
      // 為確保重置, 使用 array spread 觸發 sort 變更
      setSortBy(refDefaultSortBy.current ? [...refDefaultSortBy.current] : [])
      // will trigger fetchData by filters and sort
    }
  }, [ajax, gotoPage, setAllFilters, setSortBy])

  // 排序條件變更
  useEffect(() => {
    // 排除手動送出查詢觸發的 sort
    if (isMounted.current && !isSortChangeBySubmit.current) {
      isSortChangeByManual.current = true
      gotoPage(0)
    }
    isSortChangeBySubmit.current = false
  }, [gotoPage, sortBy])

  // 篩選條件變更
  useEffect(() => {
    // 排除手動送出查詢觸發的 filter
    if (isMounted.current && !isFilterChangeBySubmit.current) {
      isFilterChangeByManual.current = true
      gotoPage(0)
    }
    isFilterChangeBySubmit.current = false
  }, [gotoPage, filters])

  useEffect(() => {
    if (serverSide) {
      // serverSide
      if (!isMounted.current) {
        // init
        if (defaultFetchData) {
          // need to fetch data while init
          fetchData(ajax.params, pageIndex, pageSize, sortBy, filters)
        }
        isMounted.current = true
      } else if (
        isSubmitSearch.current
        || isPageChangeByManual.current // user change page
        || isSortChangeByManual.current // user change sort type
        || isFilterChangeByManual.current // user change filter conditions
      ) {
        if (isSubmitSearch.current // 手動送出查詢
          || (
            isPageChangeByManual.current // 手動切換頁
            && (dataRegister.length > 0)
            // 避免沒資料時送出查詢浪費效能、避免查詢條件不符合, 原本有資料才能送
          )
          || (
            isFilterChangeByManual.current // 手動送出篩選條件
            && (ajax.params !== null || defaultFetchData)
            // 避免沒資料時送出查詢導致錯誤
            // 限原本有資料 或 篩選條件為空才能送
            // 20220819 出現特例: server side 第一次篩選導致結果為空的以後再調整就動不了了
            // 改為 查詢參數有被設定過 或 預設送出 的情況下都可以對篩選做動作
          )
          || (
            isSortChangeByManual.current // 手動排序
            && (dataRegister.length > 0)
            // 避免沒資料時送出查詢浪費效能, 原本有資料才能送
          )
        ) {
          if (isSubmitSearch.current) {
            // 手動查詢的時候要回到第一頁
            gotoPage(0)
            fetchData(ajax.params, 0, pageSize, defaultSortBy, [])
          } else if (isSortChangeByManual.current
              || isFilterChangeByManual.current) {
            // 排序跟篩選的時候要回到第一頁
            gotoPage(0)
            fetchData(ajax.params, 0, pageSize, sortBy, filters)
          } else {
            // 切換單頁顯示筆數時直接帶 curPageSize 給後端
            fetchData(ajax.params, pageIndex, curPageSize, sortBy, filters)
          }
        }
        isSubmitSearch.current = false
        isPageChangeByManual.current = false
        isSortChangeByManual.current = false
        isFilterChangeByManual.current = false
      }
    } else {
      // manualSetData
      if (!isMounted.current) {
        // init
        isMounted.current = true
      }
      setTotal(data.length)
    }
  }, [data, fetchData, ajax, dataRegister,
    pageIndex, pageSize, sortBy, filters,
    defaultFetchData, serverSide, defaultSortBy,
    gotoPage, curPageSize])

  useEffect(() => {
    getFilters(filters)
  }, [filters, getFilters])

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div className={styles.root}>
      <div
        className={clsx(
          styles.table,
          (page.length === 0) && styles.noData
        )}
        {...getTableProps()}
      >
        <div className={styles.tHead}>
          {headerGroups.map(headerGroup => (
            !isEmptyHeader(headerGroup.headers) && (
              <div
                key={uuid()}
                className={clsx(styles.tr, styles.tHeaderRow)}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map(column => (
                  <StyledTh
                    key={column.id}
                    className={clsx(
                      styles.th,
                      column.className,
                      column.canSort && styles.canSort
                    )}
                    {...column.getHeaderProps()}
                  >
                    <div className={styles.title}>
                      <div className={styles.titleBlock}>
                        {column.canSort && (
                          <div className={styles.sortPrefix} />
                        )}
                        <div className={clsx(
                          styles.columnName,
                          column.canSort && styles.canSort
                        )}
                        >
                          {column.render('Header')}
                        </div>
                        {column.canSort ? (
                          <div className={styles.sortBtn}>
                            <StyledSortIcon
                              className={clsx(
                                styles.thSortIcon,
                                column.isSorted && 'sorted'
                              )}
                              {...column.getHeaderProps(
                                column.getSortByToggleProps({
                                  title: ('Sort by this'),
                                })
                              )}
                            >
                              {column.isSorted
                                ? (column.isSortedDesc
                                  ? <Icon path={mdiSortDescending} />
                                  : <Icon path={mdiSortAscending} />)
                                : <Icon path={mdiSort} />}
                            </StyledSortIcon>
                          </div>
                        ) : ''}
                      </div>
                      <div className={styles.filterBlock}>
                        <div className={styles.filter}>
                          {column.canFilter && column.render('Filter')}
                        </div>
                      </div>
                    </div>
                  </StyledTh>
                ))}
              </div>
            )
          ))}
        </div>
        <CustomScroll
          className={styles.tableScroll}
          allowOuterScroll={enableOuterScroll}
        >
          <div
            ref={dataTableBodyRef}
            className={clsx(styles.tBody, ((page.length === 0)
              && styles.noData))}
            style={{
              minHeight: tbodyFixHeight || tbodyMinHeight,
              maxHeight: tbodyFixHeight || tbodyMaxHeight,
            }}
            {...getTableBodyProps()}
          >
            {page.map((row) => {
              prepareRow(row)
              return (
                <StyledTr
                  key={row.id}
                  className={styles.tr}
                  {...row.getRowProps(rowProps(row))}
                >
                  <div className={styles.mainRow}>
                    {row.cells.map(cell => (
                      <div
                        key={uuid()}
                        className={clsx(
                          styles.td,
                          styles[cell.column.align],
                          cell.column.className
                        )}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </div>
                    ))}
                  </div>
                  {row.isExpanded ? (
                    <div className={styles.subRow}>
                      {renderSubRow({ row })}
                    </div>
                  ) : null}
                </StyledTr>
              )
            })}
            {
              (page.length === 0) && (
                <div className={styles.empty}>
                  {('No data')}
                </div>
              )
            }
          </div>
        </CustomScroll>
        {enableFooter && (
          <div className={styles.tFooter}>
            {footerGroups.map(footerGroup => (
              footerGroup.headers
                .some(header => header.Footer) && (
                <div
                  key={footerGroup.id}
                  className={clsx(styles.tr, styles.tFooterRow)}
                  {...footerGroup.getFooterGroupProps()}
                >
                  {footerGroup.headers.map(column => (typeof column.Footer !== 'undefined') && (
                  <div
                    key={column.id}
                    className={clsx(
                      styles.td,
                      styles[column.align],
                      column.className
                    )}
                    {...column.getFooterProps()}
                  >
                    {column.Footer && column.render('Footer')}
                  </div>
                  ))}
                </div>
              )
            ))}
          </div>
        )}
      </div>
      <div className={styles.dataTableInfo}>
        <div className={styles.curPageInfo}>
          {enablePagination && (
            <span>
              {`${('Current data section')} :  ${showMin} ~ ${showMax},`}
            </span>
          )}
          <span>
            {`${('Total number of data')} :  ${total + offsetTotal}`}
          </span>
        </div>
        { enablePagination && (
          <div className={styles.changePage}>
            <Pagination
              count={pageCount}
              defaultPage={1}
              page={pageIndex + 1}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
              size="small"
              onChange={handlePageChange}
            />
          </div>
        )}
        { enablePagination && (
          <div className={styles.pageSize}>
            <span>{('Data amount show per page')}</span>
            <Select
              labelId="pageSizeLabel"
              id="dataTableInfoPageSize"
              className={styles.pageSizeLabel}
              variant="standard"
              value={curPageSizeValue}
              inputProps={{ 'aria-label': 'Without label' }}
              onChange={handlePageSizeChange}
            >
              {pageSizeList.map(curPageSizeOption => (
                <MenuItem
                  className={styles.pageSizeMenuItem}
                  key={curPageSizeOption}
                  value={curPageSizeOption}
                >
                  {curPageSizeOption === -1 ? '∞' : curPageSizeOption}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
      </div>
      <Backdrop
        open={isLoading}
        sx={{
          position: 'absolute',
        }}
      >
        <CircularProgress />
      </Backdrop>
    </div>
  )
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  serverSide: PropTypes.bool,
  disableFilters: PropTypes.bool,
  disableSortBy: PropTypes.bool,
  ajax: PropTypes.object,
  preprocess: PropTypes.func,
  tbodyMaxHeight: PropTypes.string,
  tbodyMinHeight: PropTypes.string,
  tbodyFixHeight: PropTypes.string,
  pageSizeList: PropTypes.arrayOf(PropTypes.number),
  defaultPageSizeIndex: PropTypes.number,
  defaultSortBy: PropTypes.arrayOf(PropTypes.object),
  defaultFetchData: PropTypes.bool,
  axs: PropTypes.func,
  renderSubRow: PropTypes.func,
  rowProps: PropTypes.func,
  enableFooter: PropTypes.bool,
  enablePagination: PropTypes.bool,
  enableSubRow: PropTypes.bool,
  offsetTotal: PropTypes.number,
  enableOuterScroll: PropTypes.bool,
  getFilters: PropTypes.func,
  getServerSideData: PropTypes.func,
}

DataTable.defaultProps = {
  data: [],
  serverSide: false,
  disableFilters: false,
  disableSortBy: false,
  ajax: { url: null, params: null },
  preprocess: null,
  tbodyMaxHeight: '100vh',
  tbodyMinHeight: '0vh',
  tbodyFixHeight: null,
  pageSizeList: [10, 50, 100, 500],
  defaultPageSizeIndex: 0,
  defaultSortBy: [],
  defaultFetchData: false,
  axs: () => {},
  renderSubRow: () => {},
  rowProps: () => {},
  enableFooter: false,
  enablePagination: true,
  enableSubRow: false,
  offsetTotal: 0,
  enableOuterScroll: false,
  getFilters: () => {},
  getServerSideData: null,
}

export default React.memo(DataTable)
