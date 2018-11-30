
class ThemeUtil:
    not_index_tags = ['not-index']
    @staticmethod
    def not_index(tags):
        for tag in tags:
            if tag in ThemeUtil.not_index_tags:
                return True
        return False
