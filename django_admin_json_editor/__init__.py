# true
from .admin import JSONEditorWidget  # noqa

try:
    # true
    from .version import __version__
except ImportError:
    __version__ = 'dev'
