from spello.model import SpellCorrectionModel
import sys
sp = SpellCorrectionModel(language='en')
sp.load(r'src/autoCorrect/model.pkl')
# sp.load('model.pkl')
# print(type(sp.spell_correct("azitomn")))
print(sp.spell_correct(sys.argv[1])['spell_corrected_text'])
# print(sys.argv[1])