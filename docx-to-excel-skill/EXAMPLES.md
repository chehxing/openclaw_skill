# docx-to-excel 技能使用示例

## 快速开始示例

### 示例1：提取表格数据

**场景**：从报告文档中提取所有表格

```bash
# 基本用法
python3 scripts/extract_tables.py "报告.docx" --output "表格数据.xlsx"

# 保留格式
python3 scripts/extract_tables.py "报告.docx" --output "带格式表格.xlsx" --preserve-format

# 自定义工作表名称
python3 scripts/extract_tables.py "报告.docx" --output "数据.xlsx" --sheet-name "报告表格"
```

### 示例2：提取特定字段

**场景**：从合同文档提取关键信息

```bash
# 使用字段列表
python3 scripts/extract_fields.py "合同.docx" \
  --output "合同信息.xlsx" \
  --fields "合同标题,合同金额,签约日期,甲方,乙方"

# 使用配置文件
python3 scripts/extract_fields.py "合同.docx" \
  --output "合同信息.xlsx" \
  --config "scripts/examples/sample_config.json"

# 使用模板
python3 scripts/extract_fields.py "合同.docx" \
  --output "格式化合同.xlsx" \
  --config "合同字段配置.json" \
  --template "templates/contract_template.xlsx"
```

### 示例3：批量处理

**场景**：处理多个Word文档

```bash
# 合并所有文档到单个文件
python3 scripts/batch_process.py \
  --input-dir "documents/" \
  --output "汇总报告.xlsx"

# 为每个文档创建单独文件
python3 scripts/batch_process.py \
  --input-dir "documents/" \
  --output "individual/" \
  --no-merge

# 指定文件模式
python3 scripts/batch_process.py \
  --input-dir "reports/" \
  --output "季度报告.xlsx" \
  --pattern "Q*.docx"
```

## 实际应用示例

### 示例4：同学录信息提取

**场景**：从同学录文档提取学员信息（如刚刚完成的案例）

```python
# 专用提取脚本示例
from docx import Document
import re
import pandas as pd

def extract_classmates(doc_path):
    """提取同学录信息"""
    doc = Document(doc_path)
    students = []
    current_team = ""

    # 正则匹配：姓名（省市）
    pattern = r'([\u4e00-\u9fa5]{2,4})（([^）]+)）'

    for para in doc.paragraphs:
        text = para.text.strip()

        # 检测队伍
        if '队：' in text:
            current_team = text.split('：')[0]
            continue

        # 提取学员信息
        matches = re.findall(pattern, text)
        for name, location in matches:
            students.append({
                '所属队伍': current_team,
                '人名': name,
                '省市': location
            })

    return students

# 使用示例
students = extract_classmates("同学录.docx")
df = pd.DataFrame(students)
df.to_excel("同学录信息.xlsx", index=False)
```

### 示例5：报告数据汇总

**场景**：从月度报告提取销售数据

**配置文件** (`sales_config.json`):
```json
{
  "fields": [
    {
      "name": "报告月份",
      "type": "paragraph",
      "location": "标题1[0]",
      "pattern": "(\\d+)月销售报告"
    },
    {
      "name": "总销售额",
      "type": "table",
      "table_index": 0,
      "row": 5,
      "column": 3
    },
    {
      "name": "同比增长",
      "type": "regex",
      "pattern": "同比增长[:：]\\s*([\\d.]+)%"
    },
    {
      "name": "负责人",
      "type": "paragraph",
      "pattern": "报告人[:：]\\s*(.+)"
    }
  ]
}
```

**执行命令**:
```bash
python3 scripts/extract_fields.py "3月销售报告.docx" \
  --output "销售数据.xlsx" \
  --config "sales_config.json"
```

### 示例6：简历信息提取

**场景**：批量处理简历文档

**配置文件** (`resume_config.json`):
```json
{
  "fields": [
    {
      "name": "姓名",
      "type": "paragraph",
      "pattern": "姓名[:：]\\s*(.+)"
    },
    {
      "name": "联系方式",
      "type": "regex",
      "pattern": "(电话|手机)[:：]\\s*(\\d+)"
    },
    {
      "name": "邮箱",
      "type": "regex",
      "pattern": "邮箱[:：]\\s*([\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,})"
    },
    {
      "name": "教育背景",
      "type": "table",
      "table_index": 0,
      "extract_mode": "all_rows"
    }
  ]
}
```

**批量处理**:
```bash
# 创建简历数据库
python3 scripts/batch_process.py \
  --input-dir "resumes/" \
  --output "简历数据库.xlsx" \
  --pattern "*.docx"

# 同时提取特定字段
python3 scripts/extract_fields.py "resumes/张三.docx" \
  --output "张三信息.xlsx" \
  --config "resume_config.json"
```

## 高级配置示例

### 示例7：复杂字段映射

**场景**：提取技术文档中的参数表

**配置文件** (`tech_doc_config.json`):
```json
{
  "document_type": "technical_spec",
  "fields": [
    {
      "name": "产品型号",
      "type": "paragraph",
      "location": "标题2[0]",
      "description": "产品型号标题"
    },
    {
      "name": "技术参数",
      "type": "table",
      "table_index": 1,
      "extract_mode": "key_value",
      "key_column": 0,
      "value_column": 1
    },
    {
      "name": "测试结果",
      "type": "table",
      "table_index": 2,
      "extract_mode": "matrix",
      "start_row": 1,
      "end_row": 10
    },
    {
      "name": "认证信息",
      "type": "regex",
      "pattern": "认证标准[:：]\\s*(.+)",
      "multiple": true
    }
  ],
  "output_settings": {
    "template": "templates/tech_spec_template.xlsx",
    "validation_rules": {
      "required": ["产品型号", "技术参数"],
      "numeric_fields": ["电压", "电流", "功率"]
    }
  }
}
```

### 示例8：多文档关联提取

**场景**：从多个相关文档提取关联数据

**脚本示例** (`multi_doc_extract.py`):
```python
#!/usr/bin/env python3
"""
从多个相关文档提取关联数据
"""

import os
from pathlib import Path
import pandas as pd
from scripts.extract_fields import extract_fields
from scripts.extract_tables import extract_tables_from_docx

def extract_related_docs(main_doc, related_docs, output_path):
    """提取关联文档数据"""
    all_data = []

    # 处理主文档
    main_data = extract_fields(main_doc, load_config("main_config.json"))
    main_data['文档类型'] = '主文档'
    all_data.append(main_data)

    # 处理相关文档
    for doc in related_docs:
        doc_data = extract_tables_from_docx(doc)
        for table_data in doc_data:
            table_data['来源文档'] = Path(doc).name
            table_data['文档类型'] = '相关文档'
            all_data.extend(table_data)

    # 合并数据
    df = pd.DataFrame(all_data)
    df.to_excel(output_path, index=False)
    return df

# 使用示例
if __name__ == "__main__":
    main_doc = "项目报告.docx"
    related_docs = ["附件1.docx", "附件2.docx", "数据表.docx"]
    output = "项目完整数据.xlsx"

    result = extract_related_docs(main_doc, related_docs, output)
    print(f"提取完成，共 {len(result)} 条记录")
```

## 模板使用示例

### 示例9：自定义Excel模板

**模板文件** (`templates/report_template.xlsx`):
- 预定义样式和格式
- 字段占位符：`{字段名}`
- 计算公式和图表

**使用模板**:
```bash
python3 scripts/extract_fields.py "月度报告.docx" \
  --output "格式化报告.xlsx" \
  --config "report_config.json" \
  --template "templates/report_template.xlsx"
```

**模板中的占位符示例**:
```
单元格A1: {报告标题}
单元格B3: {报告日期}
单元格C5: {负责人}
表格区域: 自动填充提取的数据
```

### 示例10：动态模板生成

**脚本示例** (`generate_template.py`):
```python
#!/usr/bin/env python3
"""
根据配置生成Excel模板
"""

from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill

def create_dynamic_template(field_config, output_path):
    """根据字段配置生成模板"""
    wb = Workbook()
    ws = wb.active
    ws.title = "数据模板"

    # 添加标题
    ws['A1'] = "数据提取模板"
    ws['A1'].font = Font(size=16, bold=True)

    # 添加字段占位符
    row = 3
    for field in field_config['fields']:
        field_name = field['name']
        ws.cell(row=row, column=1, value=f"{field_name}:")
        ws.cell(row=row, column=2, value=f"{{{field_name}}}")
        row += 1

    # 设置样式
    for row in ws.iter_rows(min_row=3, max_row=row-1):
        for cell in row:
            cell.font = Font(name='微软雅黑', size=11)
            if cell.column == 2:  # 值列
                cell.fill = PatternFill(start_color="FFFFCC", end_color="FFFFCC", fill_type="solid")

    wb.save(output_path)

# 使用示例
config = {
    "fields": [
        {"name": "报告标题", "type": "paragraph"},
        {"name": "编制单位", "type": "paragraph"},
        {"name": "报告日期", "type": "regex"},
        {"name": "总金额", "type": "table"}
    ]
}

create_dynamic_template(config, "templates/dynamic_template.xlsx")
```

## 错误处理示例

### 示例11：健壮的提取脚本

```python
#!/usr/bin/env python3
"""
健壮的文档提取脚本，包含错误处理和日志
"""

import logging
from pathlib import Path
import sys
from scripts.extract_tables import extract_tables_from_docx, create_excel_with_tables

def safe_extract(doc_path, output_path, log_file="extraction.log"):
    """安全的文档提取函数"""
    # 配置日志
    logging.basicConfig(
        filename=log_file,
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )

    try:
        # 验证输入文件
        doc_path = Path(doc_path)
        if not doc_path.exists():
            logging.error(f"文件不存在: {doc_path}")
            return False

        if doc_path.suffix.lower() != '.docx':
            logging.warning(f"文件扩展名不是 .docx: {doc_path}")

        # 提取数据
        logging.info(f"开始提取: {doc_path}")
        tables_data = extract_tables_from_docx(str(doc_path))

        if not tables_data:
            logging.warning(f"未找到表格数据: {doc_path}")
            return False

        # 保存结果
        success = create_excel_with_tables(tables_data, output_path)

        if success:
            logging.info(f"提取成功: {doc_path} -> {output_path}")
            logging.info(f"提取了 {len(tables_data)} 个表格")
            return True
        else:
            logging.error(f"保存失败: {output_path}")
            return False

    except Exception as e:
        logging.error(f"提取过程出错: {e}", exc_info=True)
        return False

# 使用示例
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("用法: python3 safe_extract.py <输入文件> <输出文件>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    if safe_extract(input_file, output_file):
        print(f"提取成功: {output_file}")
        sys.exit(0)
    else:
        print("提取失败，请查看日志文件")
        sys.exit(1)
```

## 性能优化示例

### 示例12：批量处理优化

```python
#!/usr/bin/env python3
"""
优化批量处理性能
"""

import concurrent.futures
from pathlib import Path
from scripts.extract_tables import extract_tables_from_docx

def batch_extract_parallel(input_dir, output_dir, max_workers=4):
    """并行批量提取"""
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)

    # 获取所有.docx文件
    docx_files = list(input_path.glob("*.docx"))
    docx_files.extend(input_path.glob("*.DOCX"))

    print(f"找到 {len(docx_files)} 个文档，使用 {max_workers} 个线程处理")

    def process_file(doc_file):
        """处理单个文件"""
        try:
            tables_data = extract_tables_from_docx(str(doc_file))
            if tables_data:
                output_file = output_path / f"{doc_file.stem}.xlsx"
                # 这里调用保存函数
                return (doc_file.name, len(tables_data), True)
            return (doc_file.name, 0, False)
        except Exception as e:
            return (doc_file.name, 0, False, str(e))

    # 使用线程池并行处理
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_file = {
            executor.submit(process_file, doc_file): doc_file
            for doc_file in docx_files
        }

        for future in concurrent.futures.as_completed(future_to_file):
            results.append(future.result())

    # 输出统计
    success_count = sum(1 for r in results if r[2])
    total_tables = sum(r[1] for r in results)

    print(f"\n处理完成:")
    print(f"  成功: {success_count}/{len(docx_files)} 个文档")
    print(f"  总表格数: {total_tables}")

    return results

# 使用示例
if __name__ == "__main__":
    results = batch_extract_parallel("documents/", "output/", max_workers=8)
```

## 集成示例

### 示例13：与Web应用集成

```python
#!/usr/bin/env python3
"""
Web API接口示例
"""

from flask import Flask, request, jsonify, send_file
import tempfile
from pathlib import Path
from scripts.extract_fields import extract_fields, save_to_excel

app = Flask(__name__)

@app.route('/api/extract', methods=['POST'])
def extract_document():
    """文档提取API接口"""
    try:
        # 获取上传的文件
        if 'file' not in request.files:
            return jsonify({'error': '没有文件上传'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': '没有选择文件'}), 400

        # 保存临时文件
        with tempfile.NamedTemporaryFile(suffix='.docx', delete=False) as tmp:
            file.save(tmp.name)
            doc_path = tmp.name

        # 获取配置
        config = request.json.get('config', {})

        # 提取数据
        extracted_data = extract_fields(doc_path, config.get('fields', []))

        # 保存到临时Excel文件
        with tempfile.NamedTemporaryFile(suffix='.xlsx', delete=False) as tmp_excel:
            output_path = tmp_excel.name
            save_to_excel(extracted_data, output_path, config.get('template'))

        # 返回文件
        return send_file(
            output_path,
            as_attachment=True,
            download_name='extracted_data.xlsx'
        )

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
```

## 总结

这些示例展示了docx-to-excel技能的各种应用场景。您可以根据实际需求：

1. **选择适合的提取方法**：表格提取、字段提取或批量处理
2. **配置提取规则**：使用JSON配置文件定义复杂提取逻辑
3. **定制输出格式**：使用模板或自定义样式
4. **处理特殊情况**：添加错误处理和性能优化
5. **集成到工作流**：通过API或脚本集成到现有系统

每个示例都可以根据具体需求进行调整和扩展。技能的核心优势在于灵活性和可配置性，能够适应各种文档提取需求。