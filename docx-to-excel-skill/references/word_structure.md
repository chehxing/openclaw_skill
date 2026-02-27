# Word文档结构详解

了解Word文档的结构对于有效提取数据至关重要。本文档介绍.docx文件的核心结构和python-docx库的处理方式。

## 文档对象模型

### 1. 文档 (Document)
文档是最高级别的对象，包含所有内容。

```python
from docx import Document
doc = Document("example.docx")
```

### 2. 段落 (Paragraphs)
段落是文档的基本文本单元。

**属性：**
- `text`: 段落文本内容
- `style`: 段落样式（Normal、Heading 1、Heading 2等）
- `runs`: 文本运行列表（具有相同格式的文本片段）

**示例：**
```python
for paragraph in doc.paragraphs:
    print(f"样式: {paragraph.style.name}")
    print(f"文本: {paragraph.text}")
    print(f"运行数: {len(paragraph.runs)}")
```

### 3. 表格 (Tables)
表格是二维数据结构。

**结构：**
```
表格 (Table)
├── 行 (Row)
│   ├── 单元格 (Cell)
│   └── 单元格 (Cell)
└── 行 (Row)
    ├── 单元格 (Cell)
    └── 单元格 (Cell)
```

**访问方式：**
```python
# 按索引访问
table = doc.tables[0]
cell = table.rows[0].cells[0]
text = cell.text

# 遍历所有表格
for table_idx, table in enumerate(doc.tables):
    print(f"表格 {table_idx + 1}: {len(table.rows)}行 × {len(table.columns)}列")

    for row_idx, row in enumerate(table.rows):
        for col_idx, cell in enumerate(row.cells):
            print(f"  [{row_idx},{col_idx}]: {cell.text}")
```

### 4. 章节 (Sections)
章节定义页面布局。

**属性：**
- `start_type`: 章节开始类型（连续、新页、偶数页等）
- `page_width`, `page_height`: 页面尺寸
- `margins`: 页边距

## 样式和格式

### 标题层级
Word使用Heading样式定义文档结构：

- `Heading 1`: 一级标题（章节）
- `Heading 2`: 二级标题（子章节）
- `Heading 3`: 三级标题
- `Normal`: 正文文本

### 文本运行 (Runs)
运行是具有相同格式的文本片段。

```python
paragraph = doc.paragraphs[0]
for run in paragraph.runs:
    print(f"文本: {run.text}")
    print(f"加粗: {run.bold}")
    print(f"斜体: {run.italic}")
    print(f"字体: {run.font.name}")
    print(f"大小: {run.font.size}")
```

## 文档属性

### 核心属性
```python
props = doc.core_properties
print(f"标题: {props.title}")
print(f"作者: {props.author}")
print(f"创建日期: {props.created}")
print(f"修改日期: {props.modified}")
print(f"最后修改者: {props.last_modified_by}")
```

### 自定义属性
```python
# 访问自定义属性
custom_props = doc.part.custom_properties
for prop in custom_props.props:
    print(f"{prop.name}: {prop.value}")
```

## 常见文档模式

### 1. 报告文档
```
标题1: 报告标题
  段落: 摘要
  表格1: 数据汇总
  标题2: 详细分析
    表格2: 详细数据
    段落: 分析说明
```

### 2. 合同文档
```
标题1: 合同标题
  段落: 合同双方
  表格: 条款列表
  段落: 签名区域
```

### 3. 简历文档
```
标题1: 个人信息
  段落: 姓名、联系方式
标题2: 教育背景
  表格: 教育经历
标题2: 工作经历
  表格: 工作经历
```

## 提取策略

### 基于结构的提取
```python
def extract_by_structure(doc):
    data = {
        'title': '',
        'sections': [],
        'tables': []
    }

    # 提取标题
    for para in doc.paragraphs:
        if para.style.name.startswith('Heading 1'):
            data['title'] = para.text
        elif para.style.name.startswith('Heading'):
            level = int(para.style.name.split()[-1])
            data['sections'].append({
                'level': level,
                'text': para.text
            })

    return data
```

### 基于内容的提取
```python
def find_specific_content(doc, keywords):
    results = []

    for para in doc.paragraphs:
        for keyword in keywords:
            if keyword.lower() in para.text.lower():
                results.append({
                    'keyword': keyword,
                    'context': para.text,
                    'style': para.style.name
                })

    return results
```

## 处理技巧

### 1. 文本清理
```python
def clean_text(text):
    # 移除多余空白
    text = ' '.join(text.split())

    # 移除特殊字符（保留中文、英文、数字、标点）
    import re
    text = re.sub(r'[^\w\s\u4e00-\u9fff，。！？；："\'《》()\[\]{}]', '', text)

    return text.strip()
```

### 2. 表格规范化
```python
def normalize_table(table):
    data = []

    for row in table.rows:
        row_data = []
        for cell in row.cells:
            # 清理单元格文本
            text = clean_text(cell.text)

            # 处理合并单元格
            if cell._element.get('merge'):
                # 合并单元格处理逻辑
                pass

            row_data.append(text)
        data.append(row_data)

    return data
```

### 3. 结构识别
```python
def identify_document_type(doc):
    # 基于特征识别文档类型
    features = {
        'table_count': len(doc.tables),
        'heading_count': sum(1 for p in doc.paragraphs
                           if p.style.name.startswith('Heading')),
        'paragraph_count': len(doc.paragraphs)
    }

    if features['table_count'] > 3:
        return 'report'
    elif features['heading_count'] > 5:
        return 'contract'
    else:
        return 'general'
```

## 性能优化

### 1. 懒加载
```python
# 只加载需要的部分
def extract_tables_only(doc_path):
    from docx import Document
    doc = Document(doc_path)
    return doc.tables
```

### 2. 批量处理
```python
def batch_process(doc_paths, extract_func):
    results = []
    for path in doc_paths:
        doc = Document(path)
        result = extract_func(doc)
        results.append((path.name, result))
    return results
```

### 3. 缓存结果
```python
import hashlib
import pickle
from pathlib import Path

def cached_extract(doc_path, extract_func, cache_dir='.cache'):
    # 创建缓存键
    file_hash = hashlib.md5(Path(doc_path).read_bytes()).hexdigest()
    cache_path = Path(cache_dir) / f"{file_hash}.pkl"

    # 检查缓存
    if cache_path.exists():
        with open(cache_path, 'rb') as f:
            return pickle.load(f)

    # 执行提取
    doc = Document(doc_path)
    result = extract_func(doc)

    # 保存缓存
    cache_path.parent.mkdir(exist_ok=True)
    with open(cache_path, 'wb') as f:
        pickle.dump(result, f)

    return result
```

## 错误处理

### 常见错误
1. **文件格式错误**: 确保是有效的.docx文件
2. **编码问题**: 处理非UTF-8编码的文本
3. **内存不足**: 处理大型文档时使用流式处理
4. **样式缺失**: 处理未定义样式的段落

### 健壮性处理
```python
def safe_extract(doc_path, extract_func):
    try:
        doc = Document(doc_path)
        return extract_func(doc)
    except Exception as e:
        print(f"处理失败 {doc_path}: {e}")
        return None
```

## 最佳实践

1. **先分析后提取**: 先了解文档结构，再设计提取策略
2. **逐步验证**: 提取少量数据验证准确性
3. **处理异常**: 预料并处理各种边界情况
4. **保持灵活**: 适应不同文档格式的变化
5. **记录日志**: 记录提取过程和遇到的问题