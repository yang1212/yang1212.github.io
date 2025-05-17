<template>
  <div class="table-container">
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <!-- 选择列 -->
      <el-table-column
        v-if="selectable"
        type="selection"
        width="55"
      />
      
      <!-- 数据列 -->
      <el-table-column
        v-for="column in columns"
        :key="column.key"
        :prop="column.key"
        :label="column.title"
        :sortable="column.sortable ? 'custom' : false"
        :width="column.width"
        :fixed="column.fixed"
        :align="column.align || 'left'"
      >
        <template slot-scope="scope">
          <slot :name="column.key" :row="scope.row">
            {{ scope.row[column.key] }}
          </slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div v-if="showPagination" class="pagination-container">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        :disabled="loading"
        layout="prev, pager, next, total"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'YfTable',
  props: {
    // 表格列配置
    columns: {
      type: Array,
      required: true,
      // [{ 
      //   key: 'name',        // 数据的键名
      //   title: '姓名',      // 列标题
      //   sortable: true,     // 是否可排序
      //   width: '100',       // 列宽度
      //   fixed: false,       // 是否固定列
      //   align: 'left'       // 对齐方式
      // }]
    },
    // 表格数据
    data: {
      type: Array,
      required: true,
    },
    // 数据总条数（用于分页）
    total: {
      type: Number,
      default() {
        return this.data.length;
      }
    },
    // 是否显示加载状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 是否可选择
    selectable: {
      type: Boolean,
      default: false,
    },
    // 是否显示分页
    showPagination: {
      type: Boolean,
      default: true,
    },
    // 每页显示条数
    pageSize: {
      type: Number,
      default: 10,
    },
  },

  data() {
    return {
      currentPage: 1,
      selectedRows: [],
    }
  },

  computed: {
    // 当前页数据
    tableData() {
      if (this.showPagination) {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.data.slice(start, end);
      }
      return this.data;
    },
  },

  methods: {
    // 处理排序
    handleSortChange({ column, prop, order }) {
      this.$emit('sort-change', {
        key: prop,
        order: order === 'ascending' ? 'asc' : 'desc'
      });
    },

    // 处理选择变化
    handleSelectionChange(selection) {
      this.selectedRows = selection;
      this.$emit('selection-change', selection);
    },

    // 处理页码变化
    handlePageChange(page) {
      this.currentPage = page;
      this.$emit('page-change', page);
    },
  },
}
</script>

<style scoped>
.table-container {
  width: 100%;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style> 