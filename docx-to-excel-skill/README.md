# Word文档到Excel转换技能

这是一个openclaw技能，用于从Word文档提取结构化数据并生成Excel文件。

## 功能特性

- **多种提取模式**: 表格提取、段落提取、正则匹配、自定义字段映射
- **灵活输出**: 支持基本表格、格式化表格、多工作表、带公式和图表
- **批量处理**: 支持处理多个Word文档并合并到单个Excel文件
- **配置驱动**: 使用JSON配置文件定义提取规则
- **模板支持**: 使用Excel模板保持输出一致性

## 安装依赖

```bash
pip install python-docx openpyxl pandas
```

## 快速开始

### 1. 提取表格数据

```bash
python scripts/extract_tables.py "path/to/document.docx" --output "output.xlsx"
```

### 2. 提取自定义字段

```bash
python scripts/extract_fields.py "path/to/document.docx" \
  --output "data.xlsx" \
  --fields "标题,日期,作者,金额"
```

### 3. 批量处理文档

```bash
python scripts/batch_process.py \
  --input-dir "path/to/documents" \
  --output "summary.xlsx" \
  --pattern "*.docx"
```

## 配置文件示例

创建 `config.json`:

```json
{
  "fields": [
    {
      "name": "报告标题",
      "type": "paragraph",
      "location": "标题1[0]"
    },
    {
      "name": "合同金额",
      "type": "regex",
      "pattern": "金额[:：]\\s*(\\d+(?:\\.\\d+)?)"
    }
  ]
}
```

使用配置文件:

```bash
python scripts/extract_fields.py "document.docx" \
  --output "output.xlsx" \
  --config "config.json"
```

## 使用场景

### 报告文档处理
- 提取数据表格到Excel进行分析
- 汇总多个报告的关键指标
- 生成数据透视表和图表

### 合同文档处理
- 提取合同关键条款和日期
- 批量处理合同集合
- 生成合同摘要报告

### 简历文档处理
- 提取教育和工作经历
- 标准化简历格式
- 创建人才数据库

## 技能结构

```
docx-to-excel/
├── SKILL.md                    # 技能主文件
├── requirements.txt            # Python依赖
├── scripts/                    # Python脚本
│   ├── extract_tables.py      # 表格提取
│   ├── extract_fields.py      # 字段提取
│   └── batch_process.py       # 批量处理
├── references/                 # 参考文档
│   ├── word_structure.md      # Word文档结构
│   └── excel_formats.md       # Excel格式指南
├── templates/                  # Excel模板
│   └── basic_template.xlsx    # 基础模板
└── scripts/examples/          # 示例文件
    └── sample_config.json     # 示例配置
```

## 在LobsterAI中使用

当需要从Word文档提取数据到Excel时，LobsterAI会自动加载此技能。技能提供:

1. **智能文档分析**: 自动识别文档结构和内容类型
2. **多种提取策略**: 根据文档特点选择最佳提取方式
3. **专业Excel输出**: 生成格式美观、功能完整的Excel文件
4. **错误处理**: 处理各种文档格式问题和异常情况

## 扩展开发

### 添加自定义提取器

在 `scripts/custom_extractors/` 目录中添加新的提取逻辑:

```python
# custom_extractors/my_extractor.py
from .base import BaseExtractor

class MyExtractor(BaseExtractor):
    def extract(self, doc, config):
        # 自定义提取逻辑
        return extracted_data
```

### 创建新模板

在 `templates/` 目录中添加新的Excel模板文件，支持字段占位符如 `{字段名}`。

## 故障排除

### 常见问题

1. **依赖安装失败**
   ```bash
   pip install --upgrade pip
   pip install python-docx openpyxl pandas
   ```

2. **文档读取错误**
   - 确保是有效的.docx文件
   - 检查文件权限
   - 尝试用Word重新保存文件

3. **Excel文件问题**
   - 检查文件路径是否正确
   - 确保有写入权限
   - 关闭已打开的Excel文件

### 调试模式

使用 `--verbose` 参数查看详细处理信息:

```bash
python scripts/extract_tables.py "document.docx" --output "output.xlsx" --verbose
```

## 许可证

此技能遵循MIT许可证。详见LICENSE文件。

## 贡献

欢迎提交Issue和Pull Request来改进此技能。
