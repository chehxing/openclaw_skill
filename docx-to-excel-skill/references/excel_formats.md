# Excel格式和样式指南

本文档介绍使用openpyxl创建专业Excel文件的格式和样式最佳实践。

## 基本概念

### 工作簿和工作表
```python
from openpyxl import Workbook

# 创建工作簿
wb = Workbook()

# 获取活动工作表
ws = wb.active
ws.title = "数据表"

# 创建新工作表
ws2 = wb.create_sheet(title="汇总表")
```

### 单元格操作
```python
# 写入数据
ws['A1'] = "标题"
ws.cell(row=2, column=1, value="数据")

# 读取数据
value = ws['A1'].value
```

## 样式设置

### 字体样式
```python
from openpyxl.styles import Font

# 基本字体
font_bold = Font(bold=True)
font_large = Font(size=14)
font_red = Font(color="FF0000")

# 组合样式
font_title = Font(name='微软雅黑', size=16, bold=True, color="000000")

# 应用样式
ws['A1'].font = font_title
```

### 对齐方式
```python
from openpyxl.styles import Alignment

# 水平对齐
align_left = Alignment(horizontal='left')
align_center = Alignment(horizontal='center')
align_right = Alignment(horizontal='right')

# 垂直对齐
align_top = Alignment(vertical='top')
align_middle = Alignment(vertical='center')
align_bottom = Alignment(vertical='bottom')

# 组合对齐
align_center_all = Alignment(horizontal='center', vertical='center', wrap_text=True)

ws['A1'].alignment = align_center_all
```

### 边框样式
```python
from openpyxl.styles import Border, Side

# 边框边
thin = Side(style='thin')
medium = Side(style='medium')
thick = Side(style='thick')
dashed = Side(style='dashed')

# 完整边框
border_all = Border(left=thin, right=thin, top=thin, bottom=thin)
border_outline = Border(left=medium, right=medium, top=medium, bottom=medium)

# 应用边框
ws['A1'].border = border_all
```

### 填充颜色
```python
from openpyxl.styles import PatternFill

# 纯色填充
fill_gray = PatternFill(start_color="CCCCCC", end_color="CCCCCC", fill_type="solid")
fill_blue = PatternFill(start_color="4F81BD", end_color="4F81BD", fill_type="solid")
fill_yellow = PatternFill(start_color="FFFF00", end_color="FFFF00", fill_type="solid")

# 渐变填充（openpyxl不支持直接渐变，但可以模拟）
fill_gradient = PatternFill(start_color="FFFFFF", end_color="4F81BD", fill_type="solid")

ws['A1'].fill = fill_gray
```

## 常用格式模板

### 1. 标题格式
```python
def apply_title_format(cell, text):
    cell.value = text
    cell.font = Font(name='微软雅黑', size=16, bold=True, color="000000")
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.fill = PatternFill(start_color="4F81BD", end_color="4F81BD", fill_type="solid")
```

### 2. 表头格式
```python
def apply_header_format(cell, text):
    cell.value = text
    cell.font = Font(bold=True, color="FFFFFF")
    cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
    cell.fill = PatternFill(start_color="366092", end_color="366092", fill_type="solid")
    cell.border = Border(left=Side(style='thin'), right=Side(style='thin'),
                        top=Side(style='thin'), bottom=Side(style='thin'))
```

### 3. 数据单元格格式
```python
def apply_data_format(cell, value, is_number=False):
    cell.value = value

    if is_number:
        cell.number_format = '#,##0.00'
        cell.alignment = Alignment(horizontal='right', vertical='center')
    else:
        cell.alignment = Alignment(horizontal='left', vertical='center', wrap_text=True)

    cell.border = Border(left=Side(style='thin'), right=Side(style='thin'),
                        bottom=Side(style='thin'))
```

### 4. 总计行格式
```python
def apply_total_format(cell, value):
    cell.value = value
    cell.font = Font(bold=True)
    cell.fill = PatternFill(start_color="F2F2F2", end_color="F2F2F2", fill_type="solid")
    cell.border = Border(top=Side(style='double'), bottom=Side(style='thin'))

    if isinstance(value, (int, float)):
        cell.number_format = '#,##0.00'
        cell.alignment = Alignment(horizontal='right', vertical='center')
```

## 列和行操作

### 列宽设置
```python
from openpyxl.utils import get_column_letter

# 设置固定列宽
ws.column_dimensions['A'].width = 20
ws.column_dimensions['B'].width = 15

# 自动调整列宽（基于内容）
def auto_adjust_columns(ws):
    for column in ws.columns:
        max_length = 0
        column_letter = get_column_letter(column[0].column)

        for cell in column:
            try:
                if len(str(cell.value)) > max_length:
                    max_length = len(str(cell.value))
            except:
                pass

        adjusted_width = min(max_length + 2, 50)  # 最大50字符
        ws.column_dimensions[column_letter].width = adjusted_width
```

### 行高设置
```python
# 设置固定行高
ws.row_dimensions[1].height = 30

# 自动调整行高（需要手动计算）
def adjust_row_height(ws, row_idx, text, font_size=11):
    # 简单估算：每行大约15个字符
    lines = len(text) // 15 + 1
    height = lines * font_size * 1.2
    ws.row_dimensions[row_idx].height = min(height, 100)  # 最大100
```

## 数字格式

### 常用数字格式
```python
# 货币格式
cell.number_format = '"¥"#,##0.00'

# 百分比
cell.number_format = '0.00%'

# 日期
cell.number_format = 'yyyy-mm-dd'

# 时间
cell.number_format = 'hh:mm:ss'

# 科学计数法
cell.number_format = '0.00E+00'

# 分数
cell.number_format = '# ?/?'
```

### 条件格式
```python
from openpyxl.formatting.rule import CellIsRule, FormulaRule, ColorScaleRule

# 单元格值规则
red_fill = PatternFill(start_color="FFC7CE", end_color="FFC7CE", fill_type="solid")
ws.conditional_formatting.add('B2:B100',
                             CellIsRule(operator='greaterThan', formula=['100'], fill=red_fill))

# 公式规则
ws.conditional_formatting.add('C2:C100',
                             FormulaRule(formula=['C2>AVERAGE(C:C)'], fill=red_fill))

# 色阶
ws.conditional_formatting.add('D2:D100',
                             ColorScaleRule(start_type='min', start_color='FFFFFF',
                                           end_type='max', end_color='63BE7B'))
```

## 数据验证

```python
from openpyxl.worksheet.datavalidation import DataValidation

# 列表验证
dv_list = DataValidation(type="list", formula1='"是,否,待定"', allow_blank=True)
dv_list.add('A2:A100')
ws.add_data_validation(dv_list)

# 数字范围验证
dv_number = DataValidation(type="whole", operator="between",
                          formula1="1", formula2="100")
dv_number.add('B2:B100')
ws.add_data_validation(dv_number)

# 日期验证
dv_date = DataValidation(type="date", operator="greaterThan",
                        formula1="2024-01-01")
dv_date.add('C2:C100')
ws.add_data_validation(dv_date)
```

## 图表创建

### 柱状图
```python
from openpyxl.chart import BarChart, Reference

# 创建图表
chart = BarChart()
chart.type = "col"
chart.style = 10
chart.title = "销售数据"
chart.y_axis.title = "金额"
chart.x_axis.title = "月份"

# 添加数据
data = Reference(ws, min_col=2, min_row=1, max_row=7, max_col=3)
cats = Reference(ws, min_col=1, min_row=2, max_row=7)
chart.add_data(data, titles_from_data=True)
chart.set_categories(cats)

# 添加到工作表
ws.add_chart(chart, "E2")
```

### 饼图
```python
from openpyxl.chart import PieChart

chart = PieChart()
chart.title = "市场份额"

data = Reference(ws, min_col=2, min_row=1, max_row=5)
labels = Reference(ws, min_col=1, min_row=2, max_row=5)
chart.add_data(data, titles_from_data=True)
chart.set_categories(labels)

ws.add_chart(chart, "E10")
```

## 高级功能

### 合并单元格
```python
# 合并单元格
ws.merge_cells('A1:D1')
ws.merge_cells('A2:A5')

# 取消合并
ws.unmerge_cells('A1:D1')
```

### 冻结窗格
```python
# 冻结第一行
ws.freeze_panes = 'A2'

# 冻结第一列
ws.freeze_panes = 'B1'

# 冻结行和列
ws.freeze_panes = 'B2'
```

### 保护工作表
```python
# 保护工作表（只读）
ws.protection.sheet = True
ws.protection.password = 'password'  # 可选密码

# 允许特定操作
ws.protection.enable()
ws.protection.formatCells = False  # 允许格式化单元格
ws.protection.insertRows = False   # 允许插入行
```

### 打印设置
```python
# 页面设置
ws.page_setup.orientation = ws.ORIENTATION_LANDSCAPE  # 横向
ws.page_setup.paperSize = ws.PAPERSIZE_A4

# 页边距
ws.page_margins.left = 0.7
ws.page_margins.right = 0.7
ws.page_margins.top = 1.0
ws.page_margins.bottom = 1.0
ws.page_margins.header = 0.5
ws.page_margins.footer = 0.5

# 打印标题
ws.print_title_rows = '1:1'  # 重复第一行
ws.print_title_cols = 'A:A'  # 重复第一列
```

## 性能优化

### 批量写入
```python
# 低效方式（逐个写入）
for i in range(1000):
    ws.cell(row=i+1, column=1, value=i)

# 高效方式（批量写入）
data = [[i] for i in range(1000)]
for row in data:
    ws.append(row)
```

### 禁用计算
```python
# 禁用自动计算（写入大量公式时）
wb = Workbook()
wb._named_styles = []  # 清空命名样式缓存

# 写入完成后重新启用
wb.calculation.calcMode = 'auto'
```

### 内存优化
```python
# 使用只读模式打开大型文件
from openpyxl import load_workbook
wb = load_workbook('large_file.xlsx', read_only=True)

# 使用只写模式创建大型文件
wb = Workbook(write_only=True)
ws = wb.create_sheet()

# 只写模式下使用append
for row in large_data:
    ws.append(row)
```

## 错误处理

### 文件操作错误
```python
import os
from pathlib import Path

def safe_save(wb, filepath):
    try:
        # 确保目录存在
        Path(filepath).parent.mkdir(parents=True, exist_ok=True)

        # 保存文件
        wb.save(filepath)
        return True
    except PermissionError:
        print(f"权限错误: 无法写入 {filepath}")
        return False
    except Exception as e:
        print(f"保存失败: {e}")
        return False
```

### 样式兼容性
```python
def ensure_compatibility(ws):
    """确保样式在不同Excel版本中兼容"""

    # 避免使用太新的功能
    for row in ws.iter_rows():
        for cell in row:
            # 确保字体存在
            if cell.font and cell.font.name:
                # 替换不常见字体
                uncommon_fonts = ['Wingdings', 'Symbol']
                if cell.font.name in uncommon_fonts:
                    cell.font = Font(name='Arial')

    return True
```

## 最佳实践

### 1. 保持一致性
- 在整个工作簿中使用统一的颜色方案
- 保持相同的字体和大小
- 使用一致的边框样式

### 2. 提高可读性
- 使用足够的空白和间距
- 对齐相关数据
- 使用颜色突出重要信息

### 3. 优化性能
- 批量处理数据写入
- 避免不必要的样式计算
- 使用适当的数据类型

### 4. 确保兼容性
- 测试不同Excel版本的兼容性
- 避免使用太新的功能
- 提供替代方案

### 5. 添加元数据
- 包含文件创建信息
- 添加版本控制
- 提供使用说明